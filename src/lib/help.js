const { log } = require('../util');
const helperStr = [
  'help doc see https://github.com/SurfaceW/Qualifys',
  'qf help             show help documentation',
  'qf update           update Qualifys to the recent version',
  '==== Initializer ===',
  'qf init             init Qualifys from a scratch',
  '==== TestRunner ====',
  'qf test             run unit test based on default test format as /test/*.test.js',
  'qf test -f FILE     run unit test based on file path like: my_test/entry.test.js',
  'qf test chrome      run unit test in Chrome',
  'qf test cov         run unit test to generate coverage report',
].join('\n');

class HelpCenter {
  printHelp() {
    log(helperStr);
  }
}

module.exports = new HelpCenter();
