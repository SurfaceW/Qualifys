const path = require('path');
const Runner = require('../lib/Runner');
const configManager = require('../lib/ConfigManager');
const { execSync, writeFileSync, info, log, error, success } = require('../util');

module.exports = class TestRunner extends Runner {
  constructor(configs = {}) {
    super(Object.assign({}, {
      name: 'Test',
      command: 'test',
      commandAlias: 'ts',
      options: [
        ['-f --file', 'define the entry test file']
      ],
      description: 'Test Project',
    }, configs));
  }

  _runTest(configFile = 'karma.phantomjs.conf.js') {
    const karmaPath = require.resolve('karma/bin/karma');
    execSync('node ' + karmaPath + ' start ' + path.join(__dirname, '../config/' + configFile),
    {
      stdio: 'inherit'
    });
  }

  runPhantomTest() {
    this._runTest('karma.phantomjs.conf.js');
  }

  runChromeTest() {
    this._runTest('karma.chrome.conf.js');
  }

  runTestCoverage() {
    this._runTest('karma.phantomjs.coverage.conf.js');
  }

  run(type, options) {
    this.logStart();
    if (typeof type === 'object') this.runPhantomTest();
    if (type === 'chrome') this.runChromeTest();
    if (type === 'coverage' || type === 'cov') this.runTestCoverage();
    this.logSuccess();
  }
}
