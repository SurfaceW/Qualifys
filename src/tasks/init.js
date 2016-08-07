/**
 * Project Initializer
 */

var runCmd = require('../util').runCmd;
var fs = require('fs');
var colors = require('colors').setTheme({
  success: ['green'],
  info: ['blue']
});

module.exports = {
  // initialize the whole project
  init: function () {
    runCmd('cp', ['-r', __dirname + '/../static/', process.cwd()], true);
    runCmd('mkdir', ['src', 'dist', 'test'], true);
    console.log('===== successfully create project ====='.success);
  }
}
