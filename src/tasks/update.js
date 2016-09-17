var utils = require('../util');
var packageInfo = require('../../package.json');
var colors = require('colors/safe').setTheme({
  info: ['blue'],
  warn: ['red'],
  success: ['green']
});

var runCmd = utils.runCmd;

var updater = {};

updater.update = function() {
  runCmd('npm', ['update', '-g', '-d', 'qualifys']);
}

updater.showVersion = function() {
  console.log(packageInfo.version.success);
}

module.exports = updater;



