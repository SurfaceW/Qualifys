/**
 * Project Initializer
 */

var runCmd = require('../util').runCmd;
var fs = require('fs');
var colors = require('colors').setTheme({
  success: ['green'],
  info: ['blue'],
  warn: ['red']
});

var dirs = ['src', 'dist', 'test'];
var copy = function(dist) {
  return function() {
    runCmd('cp', ['-r', __dirname + '/../static/' + dist, process.cwd()], true)
    console.log(('add ' + (dist ? dist : 'all') + ' template').success);
  }
}

var operationsMap = {
  all: copy(''),
  test: copy('test'),
  npmignore: copy('.npmignore'),
  editorconfig: copy('.editorconfig'),
  eslintrc: copy('.eslintrc'),
  gitignore: copy('.gitignore')
};

module.exports = {
  // initialize the whole project
  init: function (name) {

    if (name && operationsMap[name]) {
      operationsMap[name]();
    } else if (typeof name === 'string') {
      console.log('no such command'.warn)
    } else {
      operationsMap['all']();
      dirs.forEach(function (name) {
        try {
          if (!fs.statSync(name).isDirectory()) {}
        } catch (e) {
          runCmd('mkdir', [name], true);
          console.log(('fail to create dir /' + name).success);
        }
      });
    }
    console.log('===== successfully ====='.success);
  }
}
