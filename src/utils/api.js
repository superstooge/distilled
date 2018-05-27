import "babel-polyfill";

const api_key =
  "a5c1b917e7ba62dcd79f434ed73bc72d";

const buildEndpoint = (label, params = {}) => {  
  const azure_endpoints = {
    //baseUrl: `http://api.brewerydb.com/v2/`,
    baseUrl: `http://localhost:3001/proxy/https://api.brewerydb.com/v2/`,
    beer: `beer/random`,
    brewery:`brewery/${params.breweryId}`
  };
  let endpoint =
    label !== "mockGameData"
      ? azure_endpoints.baseUrl + azure_endpoints[label]
      : azure_endpoints[label];
  let separator = endpoint.indexOf("?") > -1 ? "&" : "?";
  if (params) {
    for (const key in params) {
      endpoint += separator + key + "=" + params[key];
      separator = "&";
    }
  }
  endpoint += separator + "key=" + api_key;
  
  return endpoint;
};

const getData = async (endpoint, body, method) => {
  let opt = {
    method: body ? "POST" : "GET"
  };
  if (method) {
    opt.method = method;
  }
  if (body) {
    opt.body = JSON.stringify(body);
    // console.log(opt);
  }
  let content = await fetch(endpoint, opt);
  let text = await content.json();
  return text;
};

export const getRandomBeer = async () => {
  try {
    let params = {
      withBreweries: 'Y',
      hasLabels: 'Y'
    };
    let data = await getData(buildEndpoint("beer", params));
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getBreweryByID = async (id) => {
  try {
    let params = {
      breweryId: id
    };
    let data = await getData(buildEndpoint("brewery", params));
    return data;
  } catch (e) {
    console.log(e);
  }
};