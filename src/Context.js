import React from "react";
import Layout from "./Layout";
import { getRandomBeer, getBreweryByID } from "./utils/api";
const StateContext = React.createContext();
const StateProvider = StateContext.Provider;
const MethodsContext = React.createContext();
const MethodsProvider = MethodsContext.Provider;
const MAX_NET_ERRORS = 5;
export const StateConsumer = StateContext.Consumer;
export const MethodsConsumer = MethodsContext.Consumer;
export class Context extends React.Component {
  constructor() {
    super();
    this.state = {
      beer: {
        name: "",
        description: "",
        labels: { large: "" },
        breweries: [{ name: "", description: "", id: "" }],
        style: {
          description: ""
        }
      },
      brewery: { name: "", description: "", images: { large: "" } },
      processing: {
        visible: false,
        message: ""
      }
    };
    this.methods = {
      getBeer: this.getBeer.bind(this),
      getBrewery: this.getBrewery.bind(this)
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.errorCount = 0;
  }
  toggleModal(visible, message) {
    let processing = this.state.processing;
    processing.visible = visible;
    processing.message = message;
    this.setState({ processing });
  }

  render() {
    return (
      <StateProvider value={this.state}>
        <MethodsProvider value={this.methods}>
          <Layout />
        </MethodsProvider>
      </StateProvider>
    );
  }

  async getBeer() {
    this.toggleModal(true, "Loading random beer");
    let response = await getRandomBeer();
    if (response && response.data) {
      this.setState({ beer: response.data });
      await this.getBrewery(response.data.breweries[0].id);
      this.toggleModal(false);
    } else {
      this.toggleModal(true, "Loading data failed: retrying...");
      setTimeout(() => {
        if (MAX_NET_ERRORS > this.errorCount) {
          this.errorCount++;
          this.getBeer();
        } else {
          this.toggleModal(
            true,
            "There seems to be a problem with your network. Please try refreshing the page."
          );
        }
      }, 2000);
    }
  }
  async getBrewery() {
    this.toggleModal(true, "Getting brewery details");
    let response = await getBreweryByID(this.state.beer.breweries[0].id);
    this.setState({ brewery: response.data });
    this.toggleModal(false);
  }
}
