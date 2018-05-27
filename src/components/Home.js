import React, { Component } from "react";
import { StateConsumer, MethodsConsumer } from "../Context";
import { withRouter, NavLink } from "react-router-dom";
import LazyImage from "./commons/LazyImage";

class Home extends Component {
  async componentDidMount() {
    if (this.props.state.beer.name === "") {
      await this.props.methods.getBeer();
    }
  }
  render() {
    return (
      <div className="beer">
        <div className="beer-label">
          <LazyImage src={this.props.state.beer.labels.large} />
        </div>
        <div className="beer-details">
          <p className="beer-name">{this.props.state.beer.name}</p>
          <p className="beer-description">{this.props.state.beer.description}</p>
          <p className="beer-style-description">{this.props.state.beer.style.description}</p>
          <p>
            {`Brewed by: `}
            <NavLink exact to={"/details/"} className="brewery-link">
              {this.props.state.beer.breweries[0].name}
            </NavLink>
          </p>
        </div>
      </div>
    );
  }
}
export default withRouter(props => (
  <StateConsumer>
    {state => (
      <MethodsConsumer>
        {methods => <Home {...props} methods={methods} state={state} />}
      </MethodsConsumer>
    )}
  </StateConsumer>
));
