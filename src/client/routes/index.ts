/* prettier-ignore */
/*eslint-disable*/

import TableList from '../features/Explore/Illustrations';
import ExpertSystem from '../features/ExpertSystem';
import { Intro } from '../components/Intro/intro';
import { AboutUs } from '../components/AboutUs/aboutUs';
import { Contact } from '../components/Contact/index'
import { Documentation } from '../features/Explain/Documentation'

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
    component: ExpertSystem,
    layout: '/succession',
  },
  {
    path: '/tables',
    name: 'Explore',
    icon: 'nc-icon nc-tile-56',
    component: TableList,
    layout: '/succession',
  },
  {
    path: '/intro',
    name: 'Intro',
    icon: 'nc-icon nc-tile-56',
    component: Intro,
    layout: '/succession',
  },
  {
    path: '/aboutus',
    name: 'A propos',
    icon: 'nc-icon nc-tile-56',
    component: AboutUs,
    layout: '/succession',
  },
  {
    path: '/contact',
    name: 'Contact',
    icon: 'nc-icon nc-tile-56',
    component: Contact,
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
