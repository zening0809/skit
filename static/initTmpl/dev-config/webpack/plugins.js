'use strict';
const webpack = require("webpack");
const appsConfig = require("../apps.config.js");

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const NyanProgressPlugin = require("nyan-progress-webpack-plugin");
// const DashboardPlugin = require("webpack-dashboard/plugin");
const path = require("path");


// 判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

// let startServer;

// startServer = __DEV__ ? require('./start') : null;

// 通用插件组
exports.commonPlugins = [
    // 定义环境变量
    new webpack.DefinePlugin({
        // 这里将 Node 中使用的变量也传入到 Web 环境中，以方便使用
        "process.env": {
            // 因为使用热加载，所以在开发状态下可能传入的环境变量为空
            NODE_ENV: JSON.stringify(__DEV__ ? "development" : "production")
        },
        // 判断当前是否处于开发状态
        __DEV__: JSON.stringify(__DEV__)
    })
];

// 开发时使用插件
exports.devPlugins = [
    
    // 启用 HMR
    new webpack.HotModuleReplacementPlugin(),
    
    // 在控制台中输出可读的模块名，而不是返回 id
    new webpack.NamedModulesPlugin(),
    
    // 避免发出包含错误的模块
    new webpack.NoEmitOnErrorsPlugin(),
    
    // 在某个加载器升级为依靠直接传递给它的配置选项运行之前，可以使用 loader-options-plugin 来抹平差异。你可以通过这个插件配置全局/共享的加载器配置，使所有的加载器都能收到这些配置。
    // 在将来这个插件可能会被移除。
    new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
        options: {
            context: "/"
        }
    }),
    
    
    
    // new DashboardPlugin(),
    new NyanProgressPlugin({
        restoreCursorPosition: true,
        nyanCatSays:function(progress, messages) {return progress === 1 && `welcome ${appsConfig.projectName}`}
    }),
    new OpenBrowserPlugin({url: `http://${appsConfig.devServer.host}:${appsConfig.devServer.port}/`})
    // startServer
];

// 生产环境下使用插件
let prodPlugins = [
    
    // Todo:将全部 node_modules 中的代码移入，下一步优化
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: "vendor",
    //     filename: "vendor.bundle.js",
    //     minChunks: data => {
    //         let resource = data.resource;
    //         resource &&
    //         resource.indexOf("node_modules") >= 0 &&
    //         resource.match(/\.(js|scss)$/)
    //     }
    // }),
    
    // 使用 Scope Hositing 特性
    new webpack.optimize.ModuleConcatenationPlugin(),
    
    // 提取Loader定义到同一地方
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
            context: "/"
        }
    }),
    
    // 提取出所有的CSS代码
    new ExtractTextPlugin("[name].css"),
    
    // 代码压缩插件
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false,
            screw_ie8: true,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            cascade: true,
            drop_console: true
        },
        output: {
            comments: false
        }
    }),
    
    new BundleAnalyzerPlugin({
        analyzerMode: "static"
    }),
    
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks 来改善chunk传输
    
];


exports.prodPlugins = prodPlugins;
