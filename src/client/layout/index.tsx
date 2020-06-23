/*eslint-disable*/
import React from "react";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from '../components/Navbars/DemoNavbar';
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import routes from "../routes/routes";

interface DashboardProps {

}

interface DashboardState {
  backgroundColor: string;
  activeColor: string;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  mainPanel: any

  constructor(props: any) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }
  componentDidUpdate(e: any) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement!.scrollTop = 0;
    }
  }
  handleActiveClick = (color: string) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color: string) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;
