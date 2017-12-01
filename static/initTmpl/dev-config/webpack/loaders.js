'use strict';
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 判断当前是否处于开发状态下
const __DEV__ = (process.env.NODE_ENV || "development") === "development";

exports.wasm = {
    test: /\.wasm$/,
    use: ["wasm-loader"]
};

// 基于Babel的 JS/JSX Loader
exports.jsx = {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: ["babel-loader"]
};

// 对于 JS 与 JSX 的格式校验
exports.jslint = {
    enforce: "pre",
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    use: ["eslint-loader"]
};

// 根据不同的环境开发设置不同的样式加载的Loader
// const moduleCSSLoader = {
//     loader: "css-loader",
//     query: {
//         modules: true,
//         importLoaders: 1,
//         localIdentName: ""
//     }
// };

const postCSSLoader = {
    loader: "postcss-loader",
    options: require('../tool/postcss.config.js')
    // options: {
    //     config: {
    //         path: path.join(__dirname, "../tool/postcss.config.js")
    //     }
    // }
};

exports.styles = {
    // css: {
    //     test: /\.scss$|.css$/,
    //     include: [
    //         path.join(__dirname, '../../app/styles')
    //     ],
    //     use: __DEV__
    //         ? ["style-loader", moduleCSSLoader, postCSSLoader]
    //         : ExtractTextPlugin.extract({
    //             fallback: 'style-loader',
    //             use: [moduleCSSLoader, postCSSLoader]
    //         })
    // },
    scss: 
    {
        test: /\.scss$/,
        loader:  ["style-loader", "css-loader", "sass-loader", postCSSLoader]
    },
    css:{
        test: /\.css$/,
        loader: ["style-loader", "css-loader", postCSSLoader]
    }
};

// 对于图片与字体文件的导入工具,并且设置默认的 dist 中存放方式
// inline base64 URLs for <=8k images, direct URLs for the rest
exports.assets = {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
    include: [
        path.join(__dirname, '../../app')
        // path.join(__dirname, '../../node_modules/carbon/lib')
    ],
    loader: "url-loader?limit=8192&name=assets/[hash].[ext]"
};

// 对于JSON文件的导入
exports.json = {
    test: /\.json$/,
    loader: "json-loader"
};
