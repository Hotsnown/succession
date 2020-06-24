/*eslint-disable*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';

import { Route } from '../../routes'

import logo from './logo.svg';

interface SidebarProps {
  bgColor: string
  activeColor: string
  routes: Route[]
  location?: any
}

interface SidebarState {

}

class Sidebar extends React.Component <SidebarProps, SidebarState> {
  sidebar: any

  constructor(props: SidebarProps) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName: any) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="/"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="/"
            className="simple-text logo-normal"
          >
            Succession
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              return (
                <li
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
