'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');

/**
 *
 *
 * @param {*} loc
 * @returns
 */
exports.readJSON = function (loc) {
  try {
    return JSON.parse(fs.readFileSync(loc, 'utf8'));
  } catch (err) {
    err.message = loc + ': ' + err.message;
    throw err;
  }
};

/**
 *
 *
 * @param {*} loc
 * @returns
 */
exports.readYAML = function (loc) {
  try {
    return yaml.safeLoad(fs.readFileSync(loc, 'utf-8')) || {};
  } catch (err) {
    err.message = loc + ': ' + err.message;
    throw err;
  }
};

/**
 *
 *
 * @param {*} loc
 * @returns
 */
exports.readJS = function (loc) {
  try {
    delete require.cache[loc];
    return require(loc);
  } catch (err) {
    err.message = loc + ': ' + err.message;
    throw err;
  }
};

/**
 *
 *
 * @param {*} filePath
 * @returns
 */
exports.fileExists = function (filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};

exports.dirExists = function (dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    return false;
  }
};

/**
 * @function readFile
 * @param {string} loc 需要读取的文件的完整路径
 * @return {object}
 * @description 该方法接受一个文件路径作为参数，把文件内容解析为 JavaScript 对象后返回
 * 如果文件不存在，返回空对象。
 */
exports.readFile = function (loc) {
  var content = null;
  switch (path.extname(loc)) {
    case '.js':
      content = exports.readJS(loc);
      break;
    case '.json':
      content = exports.readJSON(loc);
      break;
    case '.yml':
    case '.yaml':
      content = exports.readYAML(loc);
      break;
    default:
      break;
  }
  return content;
};

/**
 * @function readFileAny
 * @param {array} files 尝试读取的文件列表
 * @return {object}
 * @description 尝试对一组文件进行读取，找到第一个存在的文件，并返回解析得到的
 * JavaScript 对象，如果所有文件都不存在，返回空对象。
 *
 */
exports.readFileAny = function (files) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(files), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      if (fs.existsSync(file)) {
        return exports.readFile(file);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};

/**
 *
 *
 * @param {string} [path='./']
 * @param {boolean} [isDic=false]
 * @returns
 */
exports.readDirectory = function () {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
  var isDic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var components = [];
  var files = fs.readdirSync(path);
  files.forEach(function (item, index) {
    if (isDic) {
      var stat = fs.lstatSync("./" + item);
      if (stat.isDirectory() === true) {
        components.push(item);
      }
    } else {
      components.push(item);
    }
  });
  return components;
};

/**
 * @function deleteFolderRecursive
 * @param {array} files 尝试读取的文件列表
 * @return {object}
 * @description 尝试对一组文件进行读取，找到第一个存在的文件，并返回解析得到的
 * JavaScript 对象，如果所有文件都不存在，返回空对象。
 *
 */
exports.deleteFolderRecursive = function (filePath, remainRootDir) {
  if (fs.existsSync(filePath)) {
    fs.readdirSync(filePath).forEach(function (file) {
      var currentPath = filePath + '/' + file;
      if (fs.lstatSync(currentPath).isDirectory()) {
        // recurse
        exports.deleteFolderRecursive(currentPath);
      } else {
        // delete file
        fs.unlinkSync(currentPath);
      }
    });

    if (!remainRootDir) {
      fs.rmdirSync(filePath);
    }
  }
};

/**
 *
 *
 * @param {*} filename
 * @returns
 */
exports.getFileSize = function (filename) {
  try {
    var stats = fs.statSync(filename);

    return stats['size'] > 1024 ? (stats['size'] / 1024).toFixed(2) + ' KB' : stats['size'] + ' Bytes';
  } catch (err) {
    return null;
  }
};

exports.writeLineFeed = function (data, splitDiv) {
  var res = data.split(splitDiv);
  var str = '';
  res.map(function (item, index) {
    if (index !== res.length - 1) {
      str += item + ',\n';
    } else {
      str += item;
    }
  });
  return str;
};

/**
 *
 *
 * @param {*} filePath
 * @param {*} subPath
 * @param {*} name
 * @param {boolean} [isAnalysis=true]
 */
exports.writeViewIndexFile = function (filePath, subPath, name) {
  var isAnalysis = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err;
    var res = data.replace(/'!!!!'/g, 'import ' + name + ' from \'./' + name + '\'\n\'!!!!\'');
    if (isAnalysis) {
      res = res.replace(/'@@@@'/g, '...' + name + ',\n  \'@@@@\'');
    } else {
      res = res.replace(/'@@@@'/g, name + ',\n  \'@@@@\'');
    }
    var viewRes = res.replace(/'@@@@'/g, '');
    viewRes = viewRes.replace(/'!!!!'/g, '');
    fs.writeFileSync(filePath, res, 'utf8');
    fs.writeFileSync(subPath, viewRes, 'utf8');
  });
};