const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "development",
    entry: [
        "./index.ts" // the entry point of our app
    ],
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    ]
});
