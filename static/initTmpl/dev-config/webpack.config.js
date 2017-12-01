'use strict';
const path = require("path");
const webpack = require("webpack");
const loaders = require("./webpack/loaders");
const plugins = require("./webpack/plugins");
const utils = require("./webpack/utils");

// 判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

// 定义统一的 Application，不同的单页面会作为不同的 Application
const appsConfig = require("./apps.config.js");

// 定义入口变量
let entry;


// 根据不同的环境状态设置不同的开发变量
if (__DEV__) {
    // 开发状态下的默认入口
    entry = {
        app: [
            "react-hot-loader/patch",
            `webpack-dev-server/client?http://0.0.0.0:${appsConfig.devServer.port}`,
            "webpack/hot/only-dev-server",
            appsConfig.devServer.appEntrySrc
        ]
    };

} else {
    entry = {};
    
    // 遍历定义好的 app 进行构造
    appsConfig.apps.forEach(function (app) {
        // 判断是否加入编译
        if (app.compiled === false) { return; }
        
        // 添加入口
        entry[app.id] = app.src;
    });
}

// 基本配置
let config = {
    // cache: false,
    entry,
    
    // 设置开发时源代码映射工具
    devtool: __DEV__ ? "cheap-module-eval-source-map" : "hidden-source-map",
    
    // 所有的出口文件，注意，所有的包括图片等本机被放置到了 dist 目录下，其他文件放置到 static 目录下
    output: {
        // 生成目录
        path: path.join(__dirname, "../dist"),
        // 生成的公共目录
        publicPath: '/assets/',
        // 文件名,不加chunkhash,以方便调试时使用，生产环境下可以设置为 [name].bundle.[hash:8].js
        filename: "[name].bundle.js",
        // 映射名
        sourceMapFilename: "[name].bundle.map",
        // 块文件索引
        chunkFilename: "[name].[chunkhash].chunk.js"
    },
    // 配置插件
    plugins: (__DEV__
        ? // 开发环境下所需要的插件
        [].concat(plugins.commonPlugins).concat(plugins.devPlugins)
        : // 生产环境下需要添加的插件
        [].concat(plugins.commonPlugins).concat(plugins.prodPlugins)),
    
    // 配置 loader
    module: {
        rules: [
            loaders.wasm,
            loaders.jsx,
            loaders.styles.css,
            loaders.styles.scss,
            loaders.assets,
            loaders.json
        ]
    },
    
    externals: utils.externals,
    target: "web",
    resolve: {
        modules: ["node_modules", "./app"],
        extensions: [".js", ".jsx", ".json"]
    }
    
};
module.exports = config;
