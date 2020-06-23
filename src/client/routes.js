import TableList from './views/Explore/Table';
import Dashboard from './views/App.tsx';

const routes = [
  {
    path: '/dashboard',
    name: 'Tree',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Table List',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
    layout: '/admin',
  },
];
export default routes;
