import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
//import "./client/assets/scss/paper-dashboard.scss?v=1.2.0";
import './client/assets/css/paper-dashboard.css'
import './client/assets/demo/demo.css'

import AdminLayout from "./client/layout";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/succession" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/succession/tables" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
