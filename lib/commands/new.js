'use strict';

var shell = require('shelljs');

var _require = require('../utils/module'),
    reportModule = _require.reportModule;

exports.usage = '创建新组件';
exports.abbr = 'n';

exports.setOptions = function () {};

exports.run = function (options) {
  // 从第三个参数开始创建
  var cwd = options.cwd;
  var argParam = process.argv[3];
  if (!argParam) {
    error('error ->  请指定配置文件');
    return;
  }

  var configPath = global.sysPath.join(cwd, argParam);
  var configData = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
  var curModule = configData.type;
  switch (curModule) {
    case 'report':
      var reportInstance = new reportModule({ cwd: cwd, configData: configData });
      reportInstance.createMenu();
      reportInstance.generateService();
      reportInstance.createView();
      break;

    default:
      break;
  }
};