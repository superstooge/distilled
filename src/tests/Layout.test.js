import React from "react";
import { Layout } from "../Layout";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { state, methods } from "./stateAndMethods";
// ensure you're resetting modules before each test
beforeEach(() => {
  jest.resetModules();
});
// add a div with #modal-root id to the global body
const modalRoot = global.document.createElement("div");
modalRoot.setAttribute("id", "modal");
const body = global.document.querySelector("body");
body.appendChild(modalRoot);
let comp;
afterEach(() => {
  comp.unmount();
});
const getComponentWithContext = (state, methods) => {
  // mock out the context you're using in the component
  jest.doMock("../Context", () => {
    return {
      StateConsumer: props => props.children(state),
      MethodsConsumer: props => props.children(methods)
    };
  });

  // you need to re-require after calling jest.doMock.
  // return the updated Component module that now includes the mocked context
  return require("../Layout").default;
};

describe("<Layout />", () => {
  it("renders without exploding", () => {
    const Component = getComponentWithContext(state, methods);
    comp = mount(<Component />);
    expect(comp).toHaveLength(1);
  });
});
