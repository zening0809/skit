'use strict';

const shell = require('shelljs');
const async = require('async');
// 替换文件中的文字 此文件替换了 package.json 的用户名
const replaceStream = require('replacestream');

const Manager = require('../modules/manager.js');
const UtilFs = require('../utils/fs.js');

exports.usage = '项目初始化';
exports.abbr = 'i';

// 增加命令行参数的方法 没有可写空
exports.setOptions = () => { };

exports.run = function(options){
    Manager.reloadRC();

    let cwd = options.cwd,
        defaultName = '',
        packageJsonPath = sysPath.join(cwd, './package.json');

    if (UtilFs.fileExists(packageJsonPath)) {
        defaultName = JSON.parse(fs.readFileSync(packageJsonPath)).name;
    } else {
        defaultName = sysPath.basename(cwd);
    }
    // defaultName 是获取当前的目录名
    const projectName = defaultName;
    const initTmplPath = sysPath.resolve(__dirname, '../../static/initTmpl/');
    initProject();

    // 可以通过configPkgName 这个命令行参数 初始化不同的文件包
    function initProject(configPkgName) {
		let funcSeries = [];

		if (configPkgName) {
			funcSeries = [
				(callback) => createPackageJson(callback),
				(callback) => createTmpl(callback)
			];
		} else {
			funcSeries = [
				(callback) => createPackageJson(callback),
				(callback) => createTmpl(callback)
			];
		}

		async.series(funcSeries, (err, results) => {});
	}
    function createPackageJson(callback) {
		if (!UtilFs.fileExists(packageJsonPath)) {
			let writePackageJsonStream = create();
			writePackageJsonStream.on('finish', () => {
				logInfo('Write ' + 'package.json'.green.bold + ' in ' + cwd);
				callback(null);
			});
		} else {
			callback(null);
		}

		function create() {
			return fs.createReadStream(sysPath.resolve(initTmplPath, 'package.json'))
                .pipe(replaceStream('@PROJECT_NAME', projectName))
                .pipe(fs.createWriteStream(sysPath.resolve(cwd, 'package.json')));
		}
    }
    
    function createTmpl(callback) {
        let copyList = ['./.eslintignore', './.gitignore', './app', './dev-config', './ReadMe.md', './yarn.lock', './template.html', './nginx'];
        copyList.map((item, index)=>{
            fs.copySync(sysPath.resolve(initTmplPath, item), sysPath.resolve(cwd, item));
        })
		callback(null);
	}
}