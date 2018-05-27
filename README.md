# distilled

## installation and start ##
  1. clone the repo and enter the `distilled` directory
  2. `npm install`
  3. open two terminal windows and launch the following commands:
        1. `npm run server`   (first window)
        2. `npm start`        (second window)
  4. navigate to `http://localhost:9000`

## App overview ##
* NodeJS version: 8.9.4
* The frontent application is built with ReactJS
* The root component is `Layout.js`
* In order to avoid the cross-origin limitations calling the breweryDB api, a minimal Express app is running as proxy server. The `npm run server` command starts the proxy and fetches the api data, upon request of the frontend.
