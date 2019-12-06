'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 处理线上环境 大小写敏感问题

var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

var normalize = require('../utils/path').normalize;