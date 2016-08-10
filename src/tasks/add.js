/**
 * Add new functionality
 */

var add = {};
var runCmd = require('../util').runCmd;
var colors = require('colors/safe').setTheme({
  info: ['blue'],
  warn: ['red'],
  success: ['green']
});

add['pre-commit'] = function () {
  runCmd('cp', ['-r', __dirname + '/../hooks/pre-commit', process.cwd() + '/.git/hooks'], true);
  runCmd('chmod', ['+x', process.cwd() + '/.git/hooks/pre-commit']);
}

add['commit-log'] = function () {
  console.log('install -g commitizen'.info);
  runCmd('npm', ['install', '-g', 'commitizen'], true);
  console.log('install -g cz-conventional-changelog'.info);
  runCmd('npm', ['install', '-g', 'cz-conventional-changelog'], true);
  require('child_process').execSync('echo \'{ "path": "cz-conventional-changelog" }\' > ~/.czrc');
  console.log('successfully installed commitizen.'.success);
  console.log('now you can use `git cz` to commit a standard log. '.success);
}

module.exports = add;
