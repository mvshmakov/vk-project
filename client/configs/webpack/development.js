const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "development",
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    entry: [
        "react-hot-loader/patch", // activate HMR for React
        "webpack-dev-server/client?http://0.0.0.0:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
        "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
        "./index.tsx" // the entry point of our app
    ],
    devServer: {
        hot: true, // enable HMR on the server
        port: 8080,
        host: "0.0.0.0",
        stats: {
            children: false, // Hide children information
            maxModules: 0 // Set the maximum number of modules to be shown
        },
        compress: true,
        progress: false,
        clientLogLevel: "warn"
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
    ]
});
