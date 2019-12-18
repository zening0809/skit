const Emitter = require('events');
const shell = require('shelljs');
const _ = require('lodash');
const UtilFs = require('../fs.js');

/**
 *
 *
 * @date 2019-12-18
 * @class BaseContainer
 * @extends {Emitter}
 */
module.exports = class BaseContainer extends Emitter {

  /**
   *Creates an instance of BaseContainer.
   * @date 2019-12-18
   */
  constructor(){
    super();
  }

  /**
   *
   *
   * @date 2019-12-18
   */
  createMenu() {
    const menuData = this.configData.menu
    let menuPathList = menuData.path.split('/')
    const menuFileName = menuPathList[1]
    let routerPath = global.sysPath.join(this.cwd, `src/router`)
    let menuPath = global.sysPath.join(this.cwd, `src/router/views/${menuFileName}.js`)
    // let menuMapPath = global.sysPath.join(this.cwd, `src/router/views_map/${menuFileName}`)
    let menuMapEnterPath = global.sysPath.join(this.cwd, `src/router/views_map/index.js`)
    let menuEnterPath = global.sysPath.join(this.cwd, `src/router/views/index.js`)
    
    let menuMap = {
      path: `/${menuFileName}`,
      component: `%import('@/views/${menuFileName}')%`,
      name: menuData.name,
      title: menuData.title,
      icon: menuData.icon
    }
    
    const hasFile = fs.existsSync(menuPath)
    if (hasFile) {
      return
    } else {
      shell.cd(routerPath);
      let menuMapStr = UtilFs.writeLineFeed(JSON.stringify(menuMap).replace(/\"/g, "'").replace(/'%|%'/g, ""), ',')
      fs.writeFileSync(`${routerPath}/views/${menuFileName}.js`, `export default [ \n ${menuMapStr}\n ]\n`, 'UTF-8', function (err) {
        if (err) {
          throw err;
        }
      });
      fs.writeFileSync(`${routerPath}/views_map/${menuFileName}.js`, `export default [ \n ${menuMapStr},\n'@@@@' \n]\n`, 'UTF-8', function (err) {
        if (err) {
          throw err;
        }
      });
      UtilFs.writeViewIndexFile(menuMapEnterPath, menuEnterPath, menuFileName)
    }
  }

  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   * @param {*} storePath
   */
  generateStore(configData, storePath) {
    shell.cd(storePath);
    this.addStoreMap(configData);
    fs.copySync(sysPath.resolve(staticStorePath, 'index.js'), sysPath.resolve(storePath, 'index.js'));
  }

  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   * @memberof BaseContainer
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

  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   * @param {*} servicePath
   * @memberof BaseContainer
   */
  generateService() {
    const configData = this.configData
    const servicePath = global.sysPath.join(this.cwd, `src/services`)
    shell.cd(servicePath);
    const featureData = configData.feature.config;
    let featureItems = [];
    featureData.items.map(item => {
      featureItems.push({
        key: item.callee,
        url: item.url
      })
    })
    let config = {
      prefix: featureData.prefix,
      items: featureItems
    }
    let configMapStr = UtilFs.writeLineFeed(JSON.stringify(config).replace(/\"/g, "'"), ',')
    fs.writeFileSync(`${configData.name}.js`, `const config = ${configMapStr} \nexport default {\n ...req.generate(config)\n}`, 'UTF-8');
    this.generateMapService(configData, servicePath)
  }

  /**
   *
   *
   * @date 2019-12-18
   * @param {*} configData
   * @param {*} mapServicePath
   * @memberof BaseContainer
   */
  generateMapService(configData, mapServicePath){
    let mapServiceFilePath = `${mapServicePath}/index.js`
    let mapServiceMapFilePath = `${mapServicePath}/map/index.js`
    const hasFile = fs.existsSync(mapServiceFilePath)
    if (hasFile) {
      UtilFs.writeViewIndexFile(mapServiceMapFilePath, mapServiceFilePath, configData.name, false)
    } else {
    }
  }
}
