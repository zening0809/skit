

module.exports = {
    projectName : 'use skit',
    // 基本的应用配置信息
    apps: [
        {
            id: "app",
            src: "./app/index.js",
            // 如果还未开发好,就设置为false
            compiled: false
        }
    ],
    
    // 开发入口配置
    devServer: {
        // 当前待调试的 APP 的入口文件
        appEntrySrc: "./app/index.js",
        // 监听的 Server 端口
        host: '127.0.0.1',
        port: 4000
    },
    
    // 依赖项配置
    proxy: {
        //后端服务器地址 http://your.backend/
        // "/api/*": "http://localhost:3001"
    },
    
    // 后端 api 配置，这样配置可以避免将测试服务器端口暴露出去
    api: {
        dev: {},
        prod: {}
    }
};
