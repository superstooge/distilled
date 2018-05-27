import React from "react";
import Home from "../components/Home";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { state, methods } from "./stateAndMethods";
// ensure you're resetting modules before each test
beforeEach(() => {
  jest.resetModules();
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
  return require("../components/Home").default;
};

describe("<Home />", () => {
  it("renders without exploding", () => {
    const Component = getComponentWithContext(state, methods);
    const comp = mount(
      <MemoryRouter>
        <Component state={state} methods={methods} />
      </MemoryRouter>
    );
    expect(comp).toHaveLength(1);
  });
  it("renders the data", () => {
    const Component = getComponentWithContext(state, methods);
    const comp = mount(
      <MemoryRouter>
        <Component state={state} methods={methods} />
      </MemoryRouter>
    );

    expect(comp.find(".beer-description").text()).toEqual(
      state.beer.description
    );
    expect(comp.find(".beer-name").text()).toEqual(state.beer.name);
  });
});
