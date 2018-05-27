export const state = {
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
export const methods = {
  getBeer: () => {},
  getBrewery: () => {}
};
