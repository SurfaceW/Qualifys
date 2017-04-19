const { info, success } = require('../util');
let id = 0;

module.exports = class Runner {
  constructor(configs) {
    id += 1;
    this.runnerId = id;
    this.name = configs.name;
    this.command = configs.command;
    this.commandAlias = configs.commandAlias;
    this.description = configs.description;
    this.options = configs.options;
  }

  logStart() {
    info(this.name.toUpperCase() + ' START', true);
  }

  logSuccess() {
    success(this.name.toUpperCase() + ' SUCCESS', true);
  }

  // @override
  run() {}
  // @override
  stop() {}
}
