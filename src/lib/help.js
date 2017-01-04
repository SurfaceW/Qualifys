var colors = require('colors/safe').setTheme({
  info: ['blue'],
  warn: ['red'],
  success: ['green']
})

module.exports = function printHelp() {
  var helperStr = [
    'help doc see https://github.com/SurfaceW/Qualifys'.success,
    'qf help             show help documentation',
    'qf update           update Qualifys to the recent version',
    '==== Initializer ==='.info,
    'qf init             init Qualifys from a scratch',
    'qf init gitignore   add .gitignore to the project',
    'qf init npmignore   add .npmignore to the project',
    'qf init eslintrc    add .eslintrc to the project',
    'qf init test        add test directory to the project',
    'qf init testlib     add test library to the project',
    '==== TestRunner ===='.info,
    'qf test             run unit test based on test/index.js',
    'qf test -f FILE     run unit test based on file path',
    '====== Linter ======'.info,
    'qf lint             run linter to /src/*.js'
  ].join('\n');
  console.log(helperStr);
}
