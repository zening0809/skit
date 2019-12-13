'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shell = require('shelljs');
var _ = require('lodash');
var UtilFs = require('../utils/fs.js');
var replaceStream = require('replacestream');
exports.usage = '创建新组件';
exports.abbr = 'n';

exports.setOptions = function () {};
var staticSearchPath = sysPath.resolve(__dirname, '../../static/containers/searchBar/');
var staticContainersPath = sysPath.resolve(__dirname, '../../static/containers/');
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
  createMenu(configData.menu);
  createView(configData);

  function createView(configData) {
    // 定义变量
    var viewPath = cwd + '/src/views/' + configData.name,
        containersPath = viewPath + '/containers',
        searchBarPath = containersPath + '/searchBar';
    // 创建文件
    shell.mkdir('-p', [viewPath, containersPath, searchBarPath]);
    shell.cd(viewPath);
    // 创建当前模块入口文件
    // fs.copySync(sysPath.resolve(staticContainersPath, 'index.vue'), sysPath.resolve(viewPath, 'index.vue'));
    fs.createReadStream(sysPath.resolve(staticContainersPath, 'index.vue')).pipe(replaceStream('@STORE_KEY', configData.name)).pipe(fs.createWriteStream(sysPath.resolve(viewPath, 'index.vue')));
    // shell.touch(`./index.vue`);
    shell.cd(searchBarPath);
    var searchMap = generateSearchBar(configData, searchBarPath);
    var searchMapStr = UtilFs.writeLineFeed((0, _stringify2.default)(searchMap).replace(/\"/g, "'"), ',');
    fs.writeFileSync('searchMap.js', 'const searchMap = ' + searchMapStr + ' \nexport default searchMap', 'UTF-8');
    shell.cd(cwd);
  }

  function createMenu(menuData) {
    var menuPathList = menuData.path.split('/');
    var menuFileName = menuPathList[1];
    var routerPath = global.sysPath.join(cwd, 'src/router');
    var menuPath = global.sysPath.join(cwd, 'src/router/views/' + menuFileName);
    var menuMapPath = global.sysPath.join(cwd, 'src/router/views_map/' + menuFileName);
    var menuMapEnterPath = global.sysPath.join(cwd, 'src/router/views_map/index.js');
    var menuEnterPath = global.sysPath.join(cwd, 'src/router/views/index.js');

    var menuMap = {
      path: '/' + menuFileName,
      component: '%import(\'@/views/' + menuFileName + '\')%',
      name: menuData.name,
      title: menuData.title,
      icon: menuData.icon
    };
    if (UtilFs.fileHasExists(menuPath)) {} else {
      shell.cd(routerPath);
      var menuMapStr = UtilFs.writeLineFeed((0, _stringify2.default)(menuMap).replace(/\"/g, "'").replace(/'%|%'/g, ""), ',');
      fs.writeFileSync(routerPath + '/views/' + menuFileName + '.js', 'export default [ \n ' + menuMapStr + '\n ]\n', 'UTF-8', function (err) {
        if (err) {
          throw err;
        }
      });
      fs.writeFileSync(routerPath + '/views_map/' + menuFileName + '.js', 'export default [ \n ' + menuMapStr + ',\n\'@@@@\' \n]\n', 'UTF-8', function (err) {
        if (err) {
          throw err;
        }
      });
      UtilFs.writeViewIndexFile(menuMapEnterPath, menuEnterPath, menuFileName);
    }
  }
  function generateSearchBar(configData, searchBarPath) {
    fs.copySync(sysPath.resolve(staticSearchPath, 'index.vue'), sysPath.resolve(searchBarPath, 'index.vue'));
    var query = {};
    var fields = [];
    var fieldsArr = [];
    var searchData = configData.containers.searchBar;
    searchData.map(function (item) {
      query[item.key] = item.defValue;
      fields.push(item.key);
      fieldsArr.push({
        key: item.key,
        name: item.label,
        show: item.show
      });
      delete item.defValue;
      delete item.show;
    });
    var formItems = _.cloneDeep(searchData);
    return {
      query: query,
      formItems: formItems,
      fields: fields,
      fieldsArr: fieldsArr
    };
  }
};