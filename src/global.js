'use strict';

require('colors');

global.fs = require('fs-extra');
global.sysPath = require('path');
global.leftPad = require('left-pad');
global.rightPad = require('right-pad');
global.globby = require('globby');
global.yargs = require('yargs');
global.JSON5 = require('json5');
global.sysPath = require('path');
global.async = require('async');
// 读取yml文件
global.yaml = require('js-yaml');

global.childProcess = require('child_process');

// 找到用户路径
global.USER_HOME = process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];

global.SKIT_HOME = sysPath.join(USER_HOME, '.skit');
global.SKIT_RC = sysPath.join(USER_HOME, '.skitrc');
// 找到commands目录路径
global.SKIT_COMMANDS_PATH = sysPath.join(__dirname, 'commands');
// 为命令行输出添加颜色
global.info = console.info; // eslint-disable-line
global.success = function() {
    info((' √ ' + Array.prototype.join.call(arguments, ' ')).green);
};
global.error = function() {
    info((' X ' + Array.prototype.join.call(arguments, ' ')).red);
};
global.warn = function() {
    info((' ∆ ' + Array.prototype.join.call(arguments, ' ')).yellow);
};
global.log = function() {
    info(('[skit] ').gray + Array.prototype.join.call(arguments, ' '));
};
global.logPlain = function() {
    info(Array.prototype.join.call(arguments, ' '));
};
global.logError = function() {
    info(('[error] ').red + Array.prototype.join.call(arguments, ' '));
};
global.logWarn = function() {
    info(('[warn] ').yellow + Array.prototype.join.call(arguments, ' '));
};
global.logInfo = function() {
    info(('[info] ').blue + Array.prototype.join.call(arguments, ' '));
};
global.logMock = function() {
    info(('[mock] ').cyan + Array.prototype.join.call(arguments, ' '));
};
global.logTime = function() {
    info(logSymbols.info + (' [' + moment().format('YY.MM.DD HH:mm:ss') + '] ').gray + Array.prototype.join.call(arguments, ' '));
};
global.logDoc = function() {
    info(('[doc] ').blue + 'Visit ' + Array.prototype.join.call(arguments, ' ').underline + ' for doc.');
};
global.logLinefeed = function() {
    info();
};
global.debug = function() {
    info();
    info(('[yKit debug] ').gray + Array.prototype.join.call(arguments, ' '));
    info();
};
global.packageJSON = require('../package.json');