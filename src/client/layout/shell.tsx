/*eslint-disable*/
import React from "react";
import { Route, Switch, RouteComponentProps, BrowserRouter } from "react-router-dom";

import DemoNavbar from '../components/Navbars/DemoNavbar';
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import ExpertSystem from '../features/ExpertSystem';

import routes from "../routes";
import { Documentation } from '../features/Explain/Documentation'
import { Intro } from '../components/Intro/intro'
import { Facts } from "../../core/explain/facts";

interface MainProps {
  facts: Facts
}

interface MainState {
  backgroundColor: string;
  activeColor: string;
  facts: Facts
}

export class Main extends React.Component<RouteComponentProps & MainProps, MainState> {
  mainPanel: any

  constructor(props: any) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      facts: {} as Facts
    };
    this.mainPanel = React.createRef();
    this.onHandleSolution = this.onHandleSolution.bind(this)
  }

  handleActiveClick = (color: string) => {
    this.setState({ activeColor: color });
  };
  
  handleBgClick = (color: string) => {
    this.setState({ backgroundColor: color });
  };

  onHandleSolution(facts: Facts) {
    this.setState({ facts: facts })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main-panel" ref={this.mainPanel}>
          <BrowserRouter>
            <Route path="/" component={DemoNavbar}></Route>
            <Route path="/" render={(props) => <Sidebar
              {...this.props}
              routes={routes}
              bgColor={this.state.backgroundColor}
              activeColor={this.state.activeColor}></Sidebar>}></Route>
            <Switch>
              <Route path='/documentation'><Documentation facts={this.state.facts} /></Route>
              <Route path='/succession/tree' render={(props) => <ExpertSystem {...props} onHandleSolution={this.onHandleSolution}></ExpertSystem>}></Route>
              {routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
              <Route exact path="/" component={Intro} />
            </Switch>
          </BrowserRouter>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Main;
