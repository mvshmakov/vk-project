const { resolve } = require("path");
const merge = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "production",
    entry: "./index.tsx",
    output: {
        filename: "js/bundle.min.js",
        path: resolve(__dirname, "../../dist"),
        publicPath: "/"
    },
    devtool: "source-map",
    plugins: [
        new CompressionPlugin({
            test: /\.(js|html|map)$/
        })
    ]
});
