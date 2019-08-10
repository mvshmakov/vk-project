const { resolve } = require("path");
const merge = require("webpack-merge");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "production",
    entry: "./index.ts",
    output: {
        filename: "js/bundle.[hash].min.js",
        path: resolve(__dirname, "../../dist"),
        publicPath: "/"
    },
    devtool: "source-map",
    plugins: []
});
