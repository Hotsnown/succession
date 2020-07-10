import TableList from '../features/Explore/Table';
import Main from '../features/Main/App';

export interface Route {
  path: string;
  name: string;
  icon: string;
  component: () => JSX.Element;
  layout: string;
}

const routes: Route[] = [
  {
    path: '/dashboard',
    name: 'Tree',
    icon: 'nc-icon nc-bank',
    component: Main,
    layout: '/succession',
  },
  {
    path: '/tables',
    name: 'Explore',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
    layout: '/succession',
  },
];

export default routes;
