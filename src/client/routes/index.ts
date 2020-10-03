/* prettier-ignore */
/*eslint-disable*/

import TableList from '../features/Explore/Illustrations';
import { Documentation } from '../features/Explain/Documentation'
import Tree from '../features/ExpertSystem'

export interface Route {
  path: string;
  name: string;
  icon: string;
  component: () => JSX.Element;
  layout: string;
}

const routes: Route[] = [
  {
    path: '/tables',
    name: 'Explore',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
    layout: '/succession',
  },
  {
    path: '/tree/view?url=https%3A%2F%2Fwebtreeprint.com%2Ftp_downloader.php%3Fpath%3Dfamous_gedcoms%2Fshakespeare.ged',
    name: 'Expert Sytem',
    icon: 'nc-icon nc-tile-56',
    component: Tree,
    layout: '/succession',
  },
  {
    path: '/documentation',
    name: 'Documentation',
    icon: 'nc-icon nc-tile-56',
    component: Documentation,
    layout: '/succession',
  }
];

export default routes;
