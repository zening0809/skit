'use strict';

const shell = require('shelljs');
const BaseModule = require('./base');
const _ = require('lodash');
const UtilFs = require('../fs.js');
const replaceStream = require('replacestream');

/**
 *
 *
 * @date 2019-12-18
 * @class reportModule
 * @extends {BaseModule}
 */
module.exports = class reportModule extends BaseModule {
  /**
   *Creates an instance of reportModule.
   * @date 2019-12-18
   * @param {*} { cwd, configData }
   */
  constructor({ cwd, configData }) {
    super();
    this.configData = configData || {}
    this.cwd = cwd || ''
  }

  /**
   *
   *
   * @date 2019-12-18
   */
  createView() {
    const configData = this.configData
    // 定义变量
    const servicePath = `${this.cwd}/src/services`,
      viewPath = `${this.cwd}/src/views/${configData.name}`,
      containersPath = `${viewPath}/containers`,
      searchBarPath = `${containersPath}/exactSearch`,
      tablePath = `${containersPath}/exactList`,
      storePath = `${viewPath}/store`,
      staticContainersPath = sysPath.resolve(__dirname, '../../../static/containers/'),
      staticSearchPath = sysPath.resolve(__dirname, '../../../static/containers/searchBar/'),
      staticTablePath = sysPath.resolve(__dirname, '../../../static/containers/tableList/'),
      staticStorePath = sysPath.resolve(__dirname, '../../../static/store/');
    // 创建文件
    shell.mkdir('-p', [viewPath, containersPath, searchBarPath, tablePath, storePath]);
    shell.cd(viewPath);
    // 创建当前模块入口文件
    fs.createReadStream(sysPath.resolve(staticContainersPath, 'index.vue'))
      .pipe(replaceStream('@STORE_KEY', configData.name))
      .pipe(fs.createWriteStream(sysPath.resolve(viewPath, 'index.vue')));
    shell.cd(searchBarPath);
    this.generateSearchBar(configData, searchBarPath, staticSearchPath)
    this.generateTableList(configData, tablePath, staticTablePath)
    this.generateStore(configData, storePath, staticStorePath)
  }

  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   * @param {*} searchBarPath
   * @param {*} staticSearchPath
   */
  generateSearchBar(configData, searchBarPath, staticSearchPath) {
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
    let searchMap = {
      query,
      formItems,
      fields,
      fieldsArr
    }
    let searchMapStr = UtilFs.writeLineFeed(JSON.stringify(searchMap).replace(/\"/g, "'"), ',')
    fs.writeFileSync(`searchMap.js`, `const searchMap = ${searchMapStr} \nexport default searchMap`, 'UTF-8');
  }

  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   * @param {*} tablePath
   * @param {*} staticTablePath
   */
  generateTableList(configData, tablePath, staticTablePath) {
    shell.cd(tablePath);
    fs.copySync(sysPath.resolve(staticTablePath, 'index.vue'), sysPath.resolve(tablePath, 'index.vue'));
    let tableListStr = UtilFs.writeLineFeed(JSON.stringify(configData.containers.tableConfig), ',')
    fs.writeFileSync(`tableMap.json`, tableListStr, 'UTF-8');
    return
  }

  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   * @param {*} storePath
   * @param {*} staticStorePath
   */
  generateStore(configData, storePath, staticStorePath) {
    shell.cd(storePath);
    this.addStoreMap(configData);
    fs.copySync(sysPath.resolve(staticStorePath, 'index.js'), sysPath.resolve(storePath, 'index.js'));
  }
  
  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   */
  addStoreMap(configData) {
    let featureData = configData.feature.config
    let featureItems = []
    featureData.items.map(item => {
      featureItems.push({
        key: item.key,
        callee: item.callee
      })
    })
    let actionMap = {
      caller: `%api.${configData.name}%`,
      items: featureItems
    }
    let serviceMapStr = UtilFs.writeLineFeed(JSON.stringify(actionMap).replace(/\"/g, "'").replace(/'%|%'/g, ""), ',')
    fs.writeFileSync(`actionMap.js`, `const serviceMap = ${serviceMapStr} \nexport default serviceMap`, 'UTF-8');
  }
}