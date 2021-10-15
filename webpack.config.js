const path = require("path");
const internal_ip = require("internal-ip");
const portfinder_sync = require("portfinder-sync");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "./src/index.js"),
    devtool: "inline-source-map",
    devServer: {
        host: internal_ip.v4.sync(),
        port: portfinder_sync.getPort(5500),
        watchFiles: ["src/*.js", "src/*.css", "src/*.glsl", "src/*.frag", "src/*.vert", "src/*.html"],
        liveReload: true,
        open: true,
        https: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            minify: true,
        }),
        new MiniCSSExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ["html-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: ["raw-loader"],
            },
        ],
    },
};
