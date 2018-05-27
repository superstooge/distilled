import React, { Component } from "react";
import { StateConsumer, MethodsConsumer } from "../Context";
import { withRouter, NavLink } from "react-router-dom";
import LazyImage from "./commons/LazyImage";

export class BreweryDetails extends Component {
  async componentDidMount() {
    if (this.props.state.beer.name === "") {
      await this.props.methods.getBeer();
    }
  }
  render() {
    return (
      <div className="beer">
        <div className="beer-label">
          <LazyImage
            src={
              this.props.state.brewery.images
                ? this.props.state.brewery.images.large
                : this.props.state.beer.labels.large
            }
          />
        </div>
        <div className="beer-details">
          <p className="beer-name">{`Brewery details: ${
            this.props.state.brewery.name
          }${
            this.props.state.brewery.established
              ? ` (${this.props.state.brewery.established})`
              : ""
          }`}</p>
          <p className="beer-description">
            {this.props.state.brewery.description}
          </p>
          <p>
            <NavLink exact to={"/"} className="brewery-link">
              {`< back to homepage`}
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
        {methods => (
          <BreweryDetails {...props} methods={methods} state={state} />
        )}
      </MethodsConsumer>
    )}
  </StateConsumer>
));
