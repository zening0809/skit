const webpack = require('webpack')
const path = require('path')
const LodashWebpackPlugin = require('lodash-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

const NODE_ENV = process.env.NODE_ENV

const PUBLIC_PATH = process.env.VUE_APP_PUBLIC_PATH

module.exports = {
    baseUrl: PUBLIC_PATH,
    assetsDir: 'static',
    lintOnSave: false,
    devServer: {
        historyApiFallback: true,
        https: false,
        hot: true,
        host: 'susf.jd.com',
        port: 80,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://susf.jd.com',
                // target: '/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },

        }
    },
    transpileDependencies: [ resolve('/node_modules/element-ui/src') ],
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/theme/index.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    configureWebpack: config => {
        const plugins = [
            new LodashWebpackPlugin({
                shorthands: true,
                cloning: true,
                paths: true
            }),
            new webpack.ProvidePlugin({
                CNST: '@/constants',
                _: '@/utils/lodash',
                jt: '@/utils/jt',
                req: '@/utils/req',
                api: '@/services'
            })
        ]
        if (NODE_ENV === 'production') {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
            plugins.push(new BundleAnalyzerPlugin())

            // 开启gzip压缩
            const CompressionWebpackPlugin = require('compression-webpack-plugin')
            const productionGzipExtensions = ['js', 'css']
            plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        }
        return { plugins }
    }
}
