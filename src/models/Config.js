'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 处理线上环境 大小写敏感问题

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const normalize = require('../utils/path').normalize;