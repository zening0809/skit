'use strict';

const shell = require('shelljs');
const _ = require('lodash');
const UtilFs = require('../utils/fs.js');
const replaceStream = require('replacestream');
exports.usage = '创建新组件';
exports.abbr = 'n';

exports.setOptions = () => { };
const staticSearchPath = sysPath.resolve(__dirname, '../../static/containers/searchBar/');
const staticTablePath = sysPath.resolve(__dirname, '../../static/containers/tableList/');
const staticContainersPath = sysPath.resolve(__dirname, '../../static/containers/');
const staticStorePath = sysPath.resolve(__dirname, '../../static/store/');
exports.run = function (options) {
  // 从第三个参数开始创建
  let cwd = options.cwd;
  const argParam = process.argv[3]
  if(!argParam){
    error('error ->  请指定配置文件');
    return
  }
  const configPath = global.sysPath.join(cwd, argParam)
  let configData = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf8'}));
  createMenu(configData.menu)
  createView(configData)

  function createView(configData) {
    // 定义变量
    let viewPath = `${cwd}/src/views/${configData.name}`,
    containersPath = `${viewPath}/containers`,
    searchBarPath = `${containersPath}/exactSearch`,
    tablePath = `${containersPath}/exactList`,
    storePath = `${viewPath}/store`;
    // 创建文件
    shell.mkdir('-p', [viewPath, containersPath, searchBarPath, tablePath, storePath]);
    shell.cd(viewPath);
    // 创建当前模块入口文件
    // fs.copySync(sysPath.resolve(staticContainersPath, 'index.vue'), sysPath.resolve(viewPath, 'index.vue'));
    fs.createReadStream(sysPath.resolve(staticContainersPath, 'index.vue'))
    .pipe(replaceStream('@STORE_KEY', configData.name))
    .pipe(fs.createWriteStream(sysPath.resolve(viewPath, 'index.vue')));
    // shell.touch(`./index.vue`);
    shell.cd(searchBarPath);
    let searchMap = generateSearchBar(configData, searchBarPath)
    let searchMapStr = UtilFs.writeLineFeed(JSON.stringify(searchMap).replace(/\"/g,"'"), ',')
    fs.writeFileSync(`searchMap.js`, `const searchMap = ${searchMapStr} \nexport default searchMap`, 'UTF-8');
    generateTableList(configData, tablePath)
    generateStore(configData, storePath)
    shell.cd(cwd);
  }
  function createMenu(menuData){
    let menuPathList = menuData.path.split('/')
    const menuFileName = menuPathList[1]
    let routerPath = global.sysPath.join(cwd, `src/router`)
    let menuPath = global.sysPath.join(cwd, `src/router/views/${menuFileName}`)
    let menuMapPath = global.sysPath.join(cwd, `src/router/views_map/${menuFileName}`)
    let menuMapEnterPath = global.sysPath.join(cwd, `src/router/views_map/index.js`)
    let menuEnterPath = global.sysPath.join(cwd, `src/router/views/index.js`)
    
    let menuMap = {
      path: `/${menuFileName}`,
      component: `%import('@/views/${menuFileName}')%`,
      name: menuData.name,
      title: menuData.title,
      icon: menuData.icon
    }
    if(UtilFs.fileHasExists(menuPath)){
  
    }else{
      shell.cd(routerPath);
      let menuMapStr = UtilFs.writeLineFeed(JSON.stringify(menuMap).replace(/\"/g,"'").replace(/'%|%'/g,""), ',')
      fs.writeFileSync(`${routerPath}/views/${menuFileName}.js`, `export default [ \n ${menuMapStr}\n ]\n`, 'UTF-8', function(err) {
          if (err) {
              throw err;
          }
      });
      fs.writeFileSync(`${routerPath}/views_map/${menuFileName}.js`, `export default [ \n ${menuMapStr},\n'@@@@' \n]\n`, 'UTF-8', function(err) {
          if (err) {
              throw err;
          }
      });
      UtilFs.writeViewIndexFile(menuMapEnterPath, menuEnterPath, menuFileName)
    }
  }
  function generateSearchBar(configData, searchBarPath){
      fs.copySync(sysPath.resolve(staticSearchPath, 'index.vue'), sysPath.resolve(searchBarPath, 'index.vue'));
      let query = {}
      let fields = []
      let fieldsArr = []
      let searchData = configData.containers.searchBar;
      searchData.map(item => {
        query[item.key] = item.defValue
        fields.push(item.key)
        fieldsArr.push({
          key: item.key,
          name: item.label,
          show: item.show
        })
        delete item.defValue
        delete item.show
      })
      let formItems = _.cloneDeep(searchData)
      return {
        query,
        formItems,
        fields,
        fieldsArr
      }
  }
  function generateTableList(configData, tablePath){
      shell.cd(tablePath);
      fs.copySync(sysPath.resolve(staticTablePath, 'index.vue'), sysPath.resolve(tablePath, 'index.vue'));
      let tableListStr = UtilFs.writeLineFeed(JSON.stringify(configData.containers.tableConfig).replace(/\"/g,"'"), ',')
      fs.writeFileSync(`tableMap.js`, `const tableMap = ${tableListStr} \nexport default tableMap`, 'UTF-8');
      return 
  }
  function generateStore(configData, storePath){
      shell.cd(storePath);
      fs.copySync(sysPath.resolve(staticStorePath, 'index.js'), sysPath.resolve(storePath, 'index.js'));
  }
}


