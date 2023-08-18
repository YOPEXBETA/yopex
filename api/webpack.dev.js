const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server.js",
  output: {
    path: path.join(__dirname, "dev-build"),
    publicPath: "/",
    filename: "[name].js",
    clean: true,
  },
  externals: [nodeExternals()],

  mode: "production",
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
