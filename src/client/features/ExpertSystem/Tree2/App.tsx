import * as H from 'history';
import * as queryString from 'query-string';
import * as React from 'react';
import {analyticsEvent} from '../../../utils/analytics';
import {Chart, ChartType} from './Chart';
import {Details} from './details';
import {EmbeddedDataSource, EmbeddedSourceSpec} from './datasources/embedded';
import {TopolaData} from '../../../utils/gedcom-utils';
import {IndiInfo} from 'topola';
import {Loader, Responsive} from 'semantic-ui-react';
import {TopBar} from './menu/topbar';
import {DataSourceEnum, SourceSelection} from './datasources/data_source';
import {
  getSelection,
  UploadSourceSpec,
  UrlSourceSpec,
  GedcomUrlDataSource,
  UploadedDataSource,
} from './datasources/load_data';
import { ErrorPopup, ErrorMessage } from './ErrorMessage';
import { data } from './datasources2/Ordre1'
import { RouteComponentProps } from 'react-router-dom';

enum AppState {
  INITIAL,
  LOADING,
  ERROR,
  SHOWING_CHART,
  LOADING_MORE,
}

type DataSourceSpec =
  | UrlSourceSpec
  | UploadSourceSpec
  | EmbeddedSourceSpec;

/** Arguments passed to the application, primarily through URL parameters. */
interface Arguments {
  sourceSpec?: DataSourceSpec;
  selection?: IndiInfo;
  chartType: ChartType;
  standalone: boolean;
  freezeAnimation?: boolean;
  showSidePanel: boolean;
}

/**
 * Retrieve arguments passed into the application through the URL and uploaded
 * data.
 */
function getArguments(location: H.Location<any>): Arguments {
  const search = queryString.parse(location.search);
  const getParam = (name: string) => {
    const value = search[name];
    return typeof value === 'string' ? value : undefined;
  };

  const view = getParam('view');
  const chartTypes = new Map<string | undefined, ChartType>([
    ['relatives', ChartType.Relatives],
    ['fancy', ChartType.Fancy],
  ]);

  const hash = getParam('file');
  const url = getParam('url');
  const embedded = getParam('embedded') === 'true'; // False by default.
  var sourceSpec: DataSourceSpec | undefined = undefined;
  if (hash) {
    sourceSpec = {
      source: DataSourceEnum.UPLOADED,
      hash,
      gedcom: location.state && location.state.data,
      images: location.state && location.state.images,
    };
  } else if (url) {
    sourceSpec = {
      source: DataSourceEnum.GEDCOM_URL,
      url,
      handleCors: getParam('handleCors') !== 'false', // True by default.
    };
  } else if (embedded) {
    sourceSpec = {source: DataSourceEnum.EMBEDDED};
  }

  const indi = getParam('indi');
  const parsedGen = Number(getParam('gen'));
  const selection = indi
    ? {id: indi, generation: !isNaN(parsedGen) ? parsedGen : 0}
    : undefined;

  return {
    sourceSpec,
    selection,
    // Hourglass is the default view.
    chartType: chartTypes.get(view) || ChartType.Hourglass,

    showSidePanel: getParam('sidePanel') !== 'false', // True by default.
    standalone: getParam('standalone') !== 'false' && !embedded,
    freezeAnimation: getParam('freeze') === 'true', // False by default
  };
}

/**
 * Returs true if the changes object has values that are different than those
 * in state.
 */
function hasUpdatedValues<T>(state: T, changes: Partial<T> | undefined) {
  if (!changes) {
    return false;
  }
  return Object.entries(changes).some(
    ([key, value]) => value !== undefined && state[key] !== value,
  );
}

interface State {
  state: AppState;
  data?: TopolaData;
  selection?: IndiInfo;
  error?: string;
  showSidePanel?: boolean;
  standalone: boolean;
  chartType: ChartType;
  showErrorPopup: boolean;
  sourceSpec?: DataSourceSpec;
  freezeAnimation?: boolean;
}

interface AppProps {
  onUpdateDeCujus: (value: string) => void;
  onUpdateMemberList: (memberList: any) => void
  deCujus: string
  processSolution: () => void
}

export class App extends React.Component<RouteComponentProps & AppProps, State> {

  state: State = {
    state: AppState.INITIAL,
    standalone: true,
    chartType: ChartType.Hourglass,
    showErrorPopup: false,
  };
  chartRef: Chart | null = null;

  /** Sets the state with a new individual selection and chart type. */
  private updateDisplay(
    selection: IndiInfo,
    otherStateChanges?: Partial<State>,
  ) {
    if (
      !this.state.selection ||
      this.state.selection.id !== selection.id ||
      this.state.selection!.generation !== selection.generation ||
      hasUpdatedValues(this.state, otherStateChanges)
    ) {
      this.setState(
        Object.assign({}, this.state, {selection}, otherStateChanges),
      );
    }
  }

  /** Sets error message after data load failure. */
  private setError(error: string) {
    this.setState(
      Object.assign({}, this.state, {
        state: AppState.ERROR,
        error,
      }),
    );
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  private readonly uploadedDataSource = new UploadedDataSource();
  private readonly gedcomUrlDataSource = new GedcomUrlDataSource();
  private readonly embeddedDataSource = new EmbeddedDataSource();

  private isNewData(sourceSpec: DataSourceSpec, selection?: IndiInfo) {
    if (
      !this.state.sourceSpec ||
      this.state.sourceSpec.source !== sourceSpec.source
    ) {
      // New data source means new data.
      return true;
    }
    const newSource = {spec: sourceSpec, selection};
    const oldSouce = {
      spec: this.state.sourceSpec,
      selection: this.state.selection,
    };
    switch (newSource.spec.source) {
      case DataSourceEnum.UPLOADED:
        return this.uploadedDataSource.isNewData(
          newSource as SourceSelection<UploadSourceSpec>,
          oldSouce as SourceSelection<UploadSourceSpec>,
          this.state.data,
        );
      case DataSourceEnum.GEDCOM_URL:
        return this.gedcomUrlDataSource.isNewData(
          newSource as SourceSelection<UrlSourceSpec>,
          oldSouce as SourceSelection<UrlSourceSpec>,
          this.state.data,
        );
      case DataSourceEnum.EMBEDDED:
        return this.embeddedDataSource.isNewData(
          newSource as SourceSelection<EmbeddedSourceSpec>,
          oldSouce as SourceSelection<EmbeddedSourceSpec>,
          this.state.data,
        );
    }
  }

  private loadData(sourceSpec: DataSourceSpec, selection?: IndiInfo) {
    switch (sourceSpec.source) {
      case DataSourceEnum.UPLOADED:
        return this.uploadedDataSource.loadData({spec: sourceSpec, selection});
      case DataSourceEnum.GEDCOM_URL:
        return this.gedcomUrlDataSource.loadData({spec: sourceSpec, selection});
      case DataSourceEnum.EMBEDDED:
        return this.embeddedDataSource.loadData({spec: sourceSpec, selection});
    }
  }

  async componentDidUpdate() {

    if (this.props.location.pathname !== '/succession/dashboard/view') {
      if (this.state.state !== AppState.INITIAL) {
        this.setState(Object.assign({}, this.state, {state: AppState.INITIAL}));
      }
      return;
    }

    const args = getArguments(this.props.location);

    if (!args.sourceSpec) {
      this.props.history.replace({pathname: '/'});
    } else if (
      this.state.state === AppState.INITIAL ||
      this.isNewData(args.sourceSpec, args.selection)
    ) {
      // Set loading state.
      this.setState(
        Object.assign({}, this.state, {
          state: AppState.LOADING,
          sourceSpec: args.sourceSpec,
          selection: args.selection,
          standalone: args.standalone,
          chartType: args.chartType,
        }),
      );
      try {
        const data = await this.loadData(args.sourceSpec, args.selection);
        console.log(data)
        // Set state with data.
        this.setState(
          Object.assign({}, this.state, {
            state: AppState.SHOWING_CHART,
            data,
            selection: getSelection(data.chartData, args.selection),
          }),
        );
      } catch (error) {
        this.setError(error.message);
      }
    }
  }

  /**
   * Called when the user clicks an individual box in the chart.
   * Updates the browser URL.
   */
  private onSelection = (selection: IndiInfo) => {
    analyticsEvent('selection_changed');
    //const location = this.props.location;
    //const search = queryString.parse(location.search);
    //search.indi = selection.id;
    //search.gen = String(selection.generation);
    //location.search = queryString.stringify(search);
    //this.props.history.push(location);
    this.props.onUpdateDeCujus(selection.id)
  }; 

  private onPrint = () => {
    analyticsEvent('print');
    this.chartRef && this.chartRef.print();
  };

  private showErrorPopup(message: string, otherStateChanges?: Partial<State>) {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          showErrorPopup: true,
          error: message,
        },
        otherStateChanges,
      ),
    );
  }

  private onDownloadPdf = async () => {
    analyticsEvent('download_pdf');
    try {
      this.chartRef && (await this.chartRef.downloadPdf());
    } catch (e) {
      this.showErrorPopup('Failed to generate PDF file.' +
      ' Please try with a smaller diagram or download an SVG file.'
      );
    }
  };

  private onDownloadPng = async () => {
    analyticsEvent('download_png');
    try {
      this.chartRef && (await this.chartRef.downloadPng());
    } catch (e) {
      this.showErrorPopup('Failed to generate PNG file.' +
      ' Please try with a smaller diagram or download an SVG file.');
    }
  };

  private onDownloadSvg = () => {
    analyticsEvent('download_svg');
    this.chartRef && this.chartRef.downloadSvg();
  };

  private onDismissErrorPopup = () => {
    this.setState(
      Object.assign({}, this.state, {
        showErrorPopup: false,
      }),
    );
  };

  private renderMainArea = () => {
    
    this.props.onUpdateMemberList(data)

    switch (this.state.state) {
      case AppState.SHOWING_CHART:
      case AppState.LOADING_MORE: 
        return (
          <div id="content">
            <ErrorPopup
              open={this.state.showErrorPopup}
              message={this.state.error}
              onDismiss={this.onDismissErrorPopup}
            />
            {this.state.state === AppState.LOADING_MORE ? (
              <Loader active size="small" className="loading-more" />
            ) : null}
            <Chart
              //data={this.state.data!.chartData}
              data={data}
              selection={this.state.selection!}
              chartType={this.state.chartType}
              onSelection={this.onSelection}
              freezeAnimation={this.state.freezeAnimation}
              ref={(ref) => (this.chartRef = ref)}
            />
            {this.state.showSidePanel ? (
              <Responsive minWidth={768} id="sidePanel">
                <Details
                  gedcom={this.state.data!.gedcom}
                  indi={this.state.selection!.id}
                />
              </Responsive>
            ) : null}
          </div>
        );

      case AppState.ERROR:
        return <ErrorMessage message={this.state.error!} />;

      case AppState.INITIAL:
      case AppState.LOADING:
        return <Loader active size="large" />;
    }
  };

  render() {
    return (
      <>
       <TopBar
            {...this.props}
            deCujus={this.props.deCujus}
            processSolution={this.props.processSolution}
            title={"Ordre 1"}
            data={this.state.data && this.state.data.chartData}
            allowAllRelativesChart={true}
            showingChart={
            this.props.history.location.pathname === '/view' &&
            (this.state.state === AppState.SHOWING_CHART ||
                this.state.state === AppState.LOADING_MORE)
            }
            standalone={this.state.standalone}
            eventHandlers={{
            onSelection: this.onSelection,
            onPrint: this.onPrint,
            onDownloadPdf: this.onDownloadPdf,
            onDownloadPng: this.onDownloadPng,
            onDownloadSvg: this.onDownloadSvg,
            }}
        />
        {this.renderMainArea()}
      </>
    );
  }
}