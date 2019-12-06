'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shell = require('shelljs');
exports.usage = '创建新组件';
exports.abbr = 'n';

exports.setOptions = function () {};
exports.run = function (options) {
    // 从第三个参数开始创建
    var minOption = 3,
        cwd = options.cwd;
    componentFactory(minOption);

    function componentFactory(minOption) {
        for (var i = minOption;; i++) {
            if (process.argv[i]) {
                createComponent(process.argv[i]);
            } else {
                return;
            }
        }
    }
    function createComponent(componentName) {
        // 定义变量
        var componentPath = cwd + '/app/skit_ui/' + componentName,
            demoPath = componentPath + '/demo',
            stylePath = componentPath + '/style';
        // 创建文件
        shell.mkdir('-p', [componentPath, demoPath, stylePath]);
        shell.cd(componentPath);
        shell.touch('./index.jsx');
        shell.touch('./index.zh-CN.md');
        shell.cd(stylePath);
        shell.touch('./index.jsx');
        fs.writeFileSync('index.jsx', 'import ' + (0, _stringify2.default)('../../style/index.less') + ' ;', 'UTF-8');
        shell.cd(cwd);
    }
};