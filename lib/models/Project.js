'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Manager = require('../modules/manager.js');

var ENVS = {
    LOCAL: 'local',
    DEV: 'dev',
    PRD: 'prd'
};

var Project = function Project(cwd) {
    (0, _classCallCheck3.default)(this, Project);

    this.commands = Manager.getCommands();
};

module.exports = Project;