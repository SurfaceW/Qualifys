var colors = require('colors/safe').setTheme({
  info: ['blue'],
  warn: ['red'],
  success: ['green']
});
var utils = require('../util');
var packageInfo = require('../../package.json');

var runCmd = utils.runCmd;
var updater = {};

updater.update = function() {
  runCmd('npm', ['update', '-g', '-d', 'qualifys']);
}

updater.showVersion = function() {
  console.log('Qualifys version: ' + updater.getVersion().success);
}

updater.getVersion = function () {
  return packageInfo.version;
}

module.exports = updater;
