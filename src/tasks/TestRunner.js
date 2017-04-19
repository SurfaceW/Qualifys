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
    this.configManager = new configManager({});
  }

  run(type, options) {
    const karmaPath = require.resolve('karma/bin/karma');
    const karmaConfig = this.configManager.getPhantomJSEnvConfig();
    this.logStart();
    execSync('node ' + karmaPath + ' start ' + path.join(__dirname, '../config/karma.phantomjs.conf.js'), {
      stdio: 'inherit'
    });
    this.logSuccess();
  }
}
