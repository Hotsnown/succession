import * as queryString from 'query-string';
import * as React from 'react';
import {analyticsEvent} from '../../../utils/analytics';
import {Chart, ChartType} from './Chart';
import {Details} from './Details';
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
import { ErrorPopup, ErrorMessage } from '../../../components/Notification/ErrorMessage';
import { RouteComponentProps } from 'react-router-dom';
import { getArguments, hasUpdatedValues } from './controller';
import Ordre1 from '../../Explore/Illustrations'
import Ordre2 from '../../Explore/examples/Ordre2';

enum TreeState {
  INITIAL,
  LOADING,
  ERROR,
  SHOWING_CHART,
  LOADING_MORE,
}

export type DataSourceSpec =
  | UrlSourceSpec
  | UploadSourceSpec
  | EmbeddedSourceSpec;

interface State {
  state: TreeState;
  data?: TopolaData;
  selection?: IndiInfo;
  error?: string;
  showSidePanel?: boolean;
  standalone: boolean;
  chartType: ChartType;
  showErrorPopup: boolean;
  sourceSpec?: DataSourceSpec;
  freezeAnimation?: boolean;
  urlData: any
}

interface TreeProps {
  onUpdateDeCujus: (value: string) => void;
  onUpdateMemberList: (memberList: any) => void
  deCujus: string
  processSolution: () => void
}

export class Tree extends React.Component<RouteComponentProps & TreeProps, State> {

  state: State = {
    state: TreeState.INITIAL,
    standalone: true,
    chartType: ChartType.Hourglass,
    showErrorPopup: false,
    urlData: JSON.parse(new URL(window.location.href).searchParams.get("data"))
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
        state: TreeState.ERROR,
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

    if (this.props.location.pathname !== '/succession/tree/view') {
      if (this.state.state !== TreeState.INITIAL) {
        this.setState(Object.assign({}, this.state, {state: TreeState.INITIAL}));
      }
      return;
    }

    const args = getArguments(this.props.location);

    if (!args.sourceSpec) {
      this.props.history.replace({pathname: '/'});
    } else if (
      this.state.state === TreeState.INITIAL ||
      this.isNewData(args.sourceSpec, args.selection)
    ) {
      this.setState(
        Object.assign({}, this.state, {
          state: TreeState.LOADING,
          sourceSpec: args.sourceSpec,
          selection: args.selection,
          standalone: args.standalone,
          chartType: args.chartType,
        }),
      );
      try {
        const data = await this.loadData(args.sourceSpec, args.selection);
        this.setState(
          Object.assign({}, this.state, {
            state: TreeState.SHOWING_CHART,
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
    const location = this.props.location;
    const search = queryString.parse(location.search);
    search.indi = selection.id;
    search.gen = String(selection.generation);
    //location.search = queryString.stringify(search);
    //this.props.history.push(location);
    this.props.onUpdateDeCujus(selection.id)
    this.setState({showSidePanel: true})
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

    this.props.onUpdateMemberList(this.state.urlData)

    switch (this.state.state) {
      case TreeState.SHOWING_CHART:
      case TreeState.LOADING_MORE: 
        return (
          <div id="content">
            <ErrorPopup
              open={this.state.showErrorPopup}
              message={this.state.error}
              onDismiss={this.onDismissErrorPopup}
            />
            {this.state.state === TreeState.LOADING_MORE ? (
              <Loader active size="small" className="loading-more" />
            ) : null}
            <Chart
              data={this.state.urlData}
              //data={this.state.data!.chartData}
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

      case TreeState.ERROR:
        return <ErrorMessage message={this.state.error!} />;

      case TreeState.INITIAL:
      case TreeState.LOADING:
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
            (this.state.state === TreeState.SHOWING_CHART ||
                this.state.state === TreeState.LOADING_MORE)
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