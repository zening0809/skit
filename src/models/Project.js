

const Manager = require('../modules/manager.js');

const ENVS = {
    LOCAL: 'local',
    DEV: 'dev',
    PRD: 'prd'
};

class Project {
    constructor(cwd) {
        this.commands = Manager.getCommands();
    }
}

module.exports = Project;