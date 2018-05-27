import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import BreweryDetails from "../components/BreweryDetails";
export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter >
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details/" component={BreweryDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
