'use strict';

import './global';
const rightPad = require('right-pad');
const version = packageJSON.version;
const optimist = require('optimist');
const UtilFs = require('./utils/fs.js');

let Manager = require('./modules/manager.js');

let initOptions = (cmd) => {
  if (cmd.setOptions) {
    cmd.setOptions(optimist);
  }
  optimist.alias('h', 'help');
  optimist.describe('h', '查看帮助');
  let options = optimist.argv;
  options.cwd = process.cwd();
  return options;
};

let helpTitle = `\n===================== SKit ${version} ====================\n`;
let cli = module.exports = {
  run: (option) => {
    // 如果不存在全局配置文件，首先创建一个
    if (!UtilFs.fileExists(SKIT_RC) && !process.env['SUDO_UID']) {
      const initRc = {
        /* eslint-disable */
        "commands": [],
        "configs": []
        /* eslint-enable */
      };
      fs.writeFileSync(SKIT_RC, JSON.stringify(initRc, null, '    '));
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
    let project = Manager.getProject(process.cwd());
    let command = project.commands.filter((command) => command.name === option || command.abbr === option)[0];
    if (!command) {
      error('Command ' + option + ' not found.');
      error(' 如果需要帮助, 请使用 skit {命令名} --help ');
      return;
    }
    //获取当前模块暴露的内容
    let module = command.module;
    // 初始化命令 
    let options = initOptions(module);
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
      //         || 'skit-config-' + plugin.name === command.pluginName
      //         || '@qnpm/skit-config-' + plugin.name === command.pluginName;
      //     cmdPlugin = plugin;
      // });
      module.run.call({
        project
      }, options);
    }
  },


  help: () => {
    info(helpTitle);
    Manager.getProject(process.cwd()).commands.forEach((command) => {
      if (command.name !== 'build') {
        const commandStr = rightPad(rightPad(command.name, 12) + (command.abbr || ''), 25);
        info(` ${commandStr} # ${command.module.usage || ''}`);
      }
    });
    info();
    info(' 如果需要帮助, 请使用 skit {命令名} --help\n');
  }
}