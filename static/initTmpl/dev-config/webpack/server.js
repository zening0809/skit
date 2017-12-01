
const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const fs = require("fs-extra");
// 默认是开发时配置
const config = require("./../webpack.config.js");
const appsConfig = require("../apps.config.js");

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    // 设置 WebpackDevServer 的开发目录，默认为当前项目的根目录
    contentBase: path.join(__dirname, "../../app"),
    publicPath: `http:\/\/${appsConfig.devServer.host}:${appsConfig.devServer.port}/assets/`,
    proxy: appsConfig.proxy,
    // 其他配置项
    host: appsConfig.devServer.host,
    compress: true,
    hot: true,
    historyApiFallback: true,
    // quiet: true,
    // noInfo: true,
    overlay: {
        warnings: true,
        errors: true
    },
    stats: {colors: true},
    disableHostCheck: true
});
server.listen(appsConfig.devServer.port, appsConfig.devServer.host, function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(`Listening at http://${appsConfig.devServer.host}:${appsConfig.devServer.port}/`);
});

