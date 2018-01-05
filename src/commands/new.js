'use strict';

const async = require('async');
const shell = require('shelljs');
const UtilFs = require('../utils/fs.js');

exports.usage = '创建新组件';
exports.abbr = 'n';

exports.setOptions = () => {};
exports.run = function(options){
    // 从第三个参数开始创建
    let minOption = 3, 
    cwd = options.cwd;
    componentFactory(minOption);

    function componentFactory(minOption) {
        for(let i = minOption; ;i++ ){
            if(process.argv[i]){
                createComponent(process.argv[i])
            }else{
                return;
            }
        }
    }
    function createComponent(componentName) {
        // 定义变量
        let componentPath = `${cwd}/app/skit_ui/${componentName}`,
        demoPath = `${componentPath}/demo`, 
        stylePath = `${componentPath}/style`;
        // 创建文件
        shell.mkdir('-p', [componentPath, demoPath, stylePath]);
        shell.cd(componentPath);
        shell.touch(`./index.jsx`);
        shell.touch(`./index.zh-CN.md`);
        shell.cd(stylePath);
        shell.touch(`./index.jsx`);
        fs.writeFileSync(`index.jsx`, 'import ' + JSON.stringify('../../style/index.less') + ' ;', 'UTF-8');
        shell.cd(cwd);
    }
}


