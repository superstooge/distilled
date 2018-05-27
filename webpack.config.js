var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: ["babel-polyfill", "./client.js"],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["es2015", "stage-0", "env", "react"],
              plugins: [
                "react-html-attrs",
                "transform-decorators-legacy",
                "transform-class-properties"
              ]
            }
          },
          {
            loader: "eslint-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ["url-loader?limit=100000"]
      }
    ]
  },
  output: {
    path: __dirname + "/dist",
    filename: "client.min.js"
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin(
          [
            {
              from: "../public/index.html",
              to: __dirname + "/dist/index.html",
              force: true
            }
          ],
          { debug: true }
        )
      ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    historyApiFallback: {
      rewrites: [{ from: /^\/.\/$/, to: "index.html" }]
    }
  },
  externals: [
    {
      xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
    }
  ]
};
