import React from "react";
import "./assets/css/main.css";
import "./assets/css/fonts.css";
import logo from "./assets/images/logo.png";
import Routes from "./routes/Routes";
import Modal from "./components/commons/Modal";
import Overlay from "./components/commons/Overlay";
import { StateConsumer, MethodsConsumer } from "./Context";

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.setIsBlurred = this.setIsBlurred.bind(this);
  }

  setIsBlurred(isBlurred) {
    let style = {};
    if (isBlurred) {
      style.filter = "blur(15px)";
    } else {
      style.filter = "none";
    }
    return style;
  }
  render() {
    return (
      <div className="container">
        <div className="topbar-black" onClick={this.props.methods.getBeer}>
          <img src={logo} className="logo" /> The Beer App
        </div>
        <div className="subtitle">
          Click the logo and load a random beer!
        </div>

        <Modal>
          <Overlay
            visible={this.props.state.processing.visible}
            message={this.props.state.processing.message}
          />
        </Modal>
        <div style={this.setIsBlurred(this.props.state.processing.visible)}>
          <Routes />
        </div>
      </div>
    );
  }
}
export default props => (
  <StateConsumer>
    {state => (
      <MethodsConsumer>
        {methods => <Layout {...props} methods={methods} state={state} />}
      </MethodsConsumer>
    )}
  </StateConsumer>
);
