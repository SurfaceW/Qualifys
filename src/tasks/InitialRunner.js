const Runner = require('../lib/Runner');
const path = require('path');
const { exec, execSync, log, success, error, getFromCwd } = require('../util');

module.exports = class InitialRunner extends Runner {
  constructor(configs = {}) {
    super(Object.assign({}, {
      name: 'Init',
      command: 'init [type]',
      commandAlias: 'ini',
      description: 'Initialize default Environment'
    }, configs));
  }

  initialTest() {
    // log('installing test lib ...');
    // exec('npm i --save-dev mocha expect.js sinon@^2.0.0')
    //   .subscribe(
    //     () => {
    //       success('successfully installed test lib as dev-dependencies')
    //       this.logSuccess();
    //     },
    //     (e) => error('failed, due to the error: ' + e)
    //   );
  }

  initialConfigs() {
    log('copying static files ...');
    // run command cp -r source dist
    execSync('cp -r '
      + path.join(__dirname, '/../static/')
      + ' ' + getFromCwd()
      , { stdio: 'inherit' });
    success('successfully copied all template files');
  }

  run(type, options) {
    this.logStart();
    if (!type) {
      this.initialConfigs();
      this.initialTest();
    }
    if (type === 'conf') this.initialConfigs();
    if (type === 'test') this.initialTest();
  }
}
