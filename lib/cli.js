'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rightPad = require('right-pad');
var version = packageJSON.version;
var optimist = require('optimist');
var UtilFs = require('./utils/fs.js');

var Manager = require('./modules/manager.js');

var initOptions = function initOptions(cmd) {
    if (cmd.setOptions) {
        cmd.setOptions(optimist);
    }
    optimist.alias('h', 'help');
    optimist.describe('h', '查看帮助');
    var options = optimist.argv;
    options.cwd = process.cwd();
    return options;
};

var helpTitle = '\n===================== SKit ' + version + ' ====================\n';
var cli = module.exports = {
    run: function run(option) {

        // 如果不存在全局配置文件，首先创建一个
        if (!UtilFs.fileExists(SKIT_RC) && !process.env['SUDO_UID']) {
            var initRc = {
                /* eslint-disable */
                "commands": [],
                "configs": []
                /* eslint-enable */
            };
            fs.writeFileSync(SKIT_RC, (0, _stringify2.default)(initRc, null, '    '));
        }
        // 处理辅助命令
        if (option === '-v' || option === '--version') {
            success(version);
            return;
        } else if (option === '-h' || option === '--help' || !option) {
            cli.help();
            return;
        }

        // 处理核心命令
        var project = Manager.getProject(process.cwd());
        var command = project.commands.filter(function (command) {
            return command.name === option || command.abbr === option;
        })[0];
        if (!command) {
            error('Command ' + option + ' not found.');
            error(' 如果需要帮助, 请使用 skit {命令名} --help ');
            return;
        }
        //获取当前模块暴露的内容
        var module = command.module;
        // 初始化命令 
        var options = initOptions(module);
        if (options.h || options.help) {
            info(helpTitle);
            info('命令:', option);
            info('说明:', module.usage || '');
            info();
            optimist.showHelp();
            info(' 如果需要帮助, 请使用 skit {命令名} --help ');
        } else {
            // 判断命令是否有第三方插件
            // let cmdPlugin = '';
            // project.plugins.map((plugin) => {
            //     const isCmdBelongToPlugin = typeof plugin === 'string'
            //         ? plugin === command.pluginName
            //         : plugin.name === command.pluginName
            //         || 'ykit-config-' + plugin.name === command.pluginName
            //         || '@qnpm/ykit-config-' + plugin.name === command.pluginName;
            //     cmdPlugin = plugin;
            // });
            module.run.call({
                project: project
            }, options);
        }
    },

    help: function help() {
        info(helpTitle);
        Manager.getProject(process.cwd()).commands.forEach(function (command) {
            if (command.name !== 'build') {
                var commandStr = rightPad(rightPad(command.name, 12) + (command.abbr || ''), 25);
                info(' ' + commandStr + ' # ' + (command.module.usage || ''));
            }
        });
        info();
        info(' 如果需要帮助, 请使用 skit {命令名} --help\n');
    }
};