import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";

export default class LazyImage extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  constructor(props) {
    super(props);
    this._isMounted = false;
    let img = new Image();
    img.onload = () => {
      if (this._isMounted) {
        this.setState({
          loaded: true
        });
      }
    };

    img.onerror = console.log;

    this.state = {
      img,
      loaded: false
    };
  }

  static getDerivedStateFromProps({ src }, { img }) {
    img.src = src;
    return {
      loaded: false
    };
  }

  render() {
    if (!this.state.loaded) {
      return <Loading message="Loading image" displayAnimation={true} />;
    }
    return <img {...this.props} />;
  }
}
