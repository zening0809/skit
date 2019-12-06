'use strict';

// 处理不同操作系统的路径问题

exports.normalize = function (str, stripTrailing) {
    if (typeof str !== 'string') {
        throw new TypeError('expected a string');
    }
    str = str.replace(/[\\\/]+/g, '/');
    if (stripTrailing !== false) {
        str = str.replace(/\/$/, '');
    }
    return str;
};