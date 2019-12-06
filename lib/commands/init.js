'use strict';

var shell = require('shelljs');
var async = require('async');
// 替换文件中的文字 此文件替换了 package.json 的用户名
var replaceStream = require('replacestream');

var Manager = require('../modules/manager.js');
var UtilFs = require('../utils/fs.js');

exports.usage = '项目初始化';
exports.abbr = 'i';

// 增加命令行参数的方法 没有可写空
exports.setOptions = function () {};

exports.run = function (options) {
  Manager.reloadRC();

  var cwd = options.cwd,
      defaultName = '',
      packageJsonPath = sysPath.join(cwd, './package.json');

  if (UtilFs.fileExists(packageJsonPath)) {
    defaultName = JSON.parse(fs.readFileSync(packageJsonPath)).name;
  } else {
    defaultName = sysPath.basename(cwd);
  }
  // defaultName 是获取当前的目录名
  var projectName = defaultName;
  var initTmplPath = sysPath.resolve(__dirname, '../../static/initTmpl/');
  initProject();

  // 可以通过configPkgName 这个命令行参数 初始化不同的文件包
  function initProject(configPkgName) {
    var funcSeries = [];

    if (configPkgName) {
      funcSeries = [function (callback) {
        return createPackageJson(callback);
      }, function (callback) {
        return createTmpl(callback);
      }];
    } else {
      funcSeries = [function (callback) {
        return createPackageJson(callback);
      }, function (callback) {
        return createTmpl(callback);
      }];
    }

    async.series(funcSeries, function (err, results) {});
  }
  function createPackageJson(callback) {
    if (!UtilFs.fileExists(packageJsonPath)) {
      var writePackageJsonStream = create();
      writePackageJsonStream.on('finish', function () {
        logInfo('Write ' + 'package.json'.green.bold + ' in ' + cwd);
        callback(null);
      });
    } else {
      callback(null);
    }

    function create() {
      return fs.createReadStream(sysPath.resolve(initTmplPath, 'package.json')).pipe(replaceStream('@PROJECT_NAME', projectName)).pipe(fs.createWriteStream(sysPath.resolve(cwd, 'package.json')));
    }
  }

  function createTmpl(callback) {
    var copyList = UtilFs.readDirectory(initTmplPath);
    copyList.map(function (item, index) {
      fs.copySync(sysPath.resolve(initTmplPath, item), sysPath.resolve(cwd, item));
    });
    callback(null);
  }
};