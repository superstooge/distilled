import React from "react";
import BreweryDetails from "../components/BreweryDetails";
import { mount, shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { state, methods } from "./stateAndMethods";
import { MemoryRouter } from "react-router";

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
  return require("../components/BreweryDetails").default;
};

describe("<BreweryDetails />", () => {
  it("renders without exploding", () => {
    const Component = getComponentWithContext(state, methods);
    const comp = mount(
      <MemoryRouter>
        <Component />
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
      state.brewery.description
    );
    expect(comp.find(".beer-name").text()).toEqual(
      `Brewery details: ${state.brewery.name}`
    );
  });
});
