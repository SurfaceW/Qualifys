const Runner = require('../lib/Runner');
const { execSync, info, log, success } = require('../util');

module.exports = class UpdateRunner extends Runner {
  constructor(configs = {}) {
    super(Object.assign({}, {
      name: 'Update',
      command: 'update',
      commandAlias: 'update',
      description: 'Update Qualifys tool',
    }, configs));
  }

  run() {
    this.logStart();
    execSync('npm update -g -d qualifys', { stdio: 'inherit' });
    this.logSuccess();
  }
}
