'use strict';

const shell = require('shelljs');
const { reportModule } = require('../utils/module');
exports.usage = '创建新组件';
exports.abbr = 'n';

exports.setOptions = () => { };

exports.run = function (options) {
  // 从第三个参数开始创建
  let cwd = options.cwd;
  const argParam = process.argv[3]
  if (!argParam) {
    error('error ->  请指定配置文件');
    return
  }

  const configPath = global.sysPath.join(cwd, argParam)
  let configData = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
  const curModule = configData.type
  switch (curModule) {
    case 'report':
      const reportInstance = new reportModule({ cwd, configData})
      reportInstance.createMenu()
      reportInstance.generateService()
      reportInstance.createView()
      break;

    default:
      break;
  }
}


