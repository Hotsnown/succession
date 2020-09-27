import { ChartType } from './Chart';
import { DataSourceEnum } from './datasources/data_source';
import { DataSourceSpec } from './Tree';
import * as queryString from 'query-string';
import * as H from 'history';
import {IndiInfo} from 'topola';

/** Arguments passed to the application, primarily through URL parameters. */
export interface Arguments {
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
export function getArguments(location: H.Location<any>): Arguments {
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
  }
  else if (url) {
    sourceSpec = {
      source: DataSourceEnum.GEDCOM_URL,
      url,
      handleCors: getParam('handleCors') !== 'false',
    };
  }
  else if (embedded) {
    sourceSpec = { source: DataSourceEnum.EMBEDDED };
  }
  const indi = getParam('indi');
  const parsedGen = Number(getParam('gen'));
  const selection = indi
    ? { id: indi, generation: !isNaN(parsedGen) ? parsedGen : 0 }
    : undefined;
  return {
    sourceSpec,
    selection,
    // Hourglass is the default view.
    chartType: chartTypes.get(view) || ChartType.Hourglass,
    showSidePanel: getParam('sidePanel') !== 'false',
    standalone: getParam('standalone') !== 'false' && !embedded,
    freezeAnimation: getParam('freeze') === 'true',
  };
}

/**
 * Returs true if the changes object has values that are different than those
 * in state.
 */
export function hasUpdatedValues<T>(state: T, changes: Partial<T> | undefined) {
  if (!changes) {
    return false;
  }
  return Object.entries(changes).some(([key, value]) => value !== undefined && state[key] !== value);
}
