/**
 * Project Initializer
 */

var runCmd = require('../util').runCmd;
var fs = require('fs');
var colors = require('colors').setTheme({
  success: ['green'],
  info: ['blue']
});

var dirs = ['src', 'dist', 'test'];

module.exports = {
  // initialize the whole project
  init: function () {
    runCmd('cp', ['-r', __dirname + '/../static/', process.cwd()], true);

    console.log('add .editorconfig template'.success);
    console.log('add .eslintrc template'.success);
    console.log('add .gitignore template'.success);
    console.log('add .npmignore template'.success);

    dirs.forEach(function (name) {
      try {
        if(!fs.statSync(name).isDirectory()) {
          runCmd('mkdir', [name], true);
          console.log(('create dir /' + name).success);
        }
      } catch (e) {
        runCmd('mkdir', [name], true);
        console.log(('create dir /' + name).success);
      }
    });
    console.log('===== successfully ====='.success);
  }
}
