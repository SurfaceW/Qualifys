/**
 * Add new functionality
 */

var add = {};
var runCmd = require('../util').runCmd;

add['pre-commit'] = function () {
  runCmd('cp', ['-r', __dirname + '/../hooks/pre-commit', process.cwd() + '/.git/hooks'], true);
  runCmd('chmod', ['+x', process.cwd() + '/.git/hooks/pre-commit']);
}

module.exports = add;
