var file = require('html-wiring');
var path = require('path');
var pkg = JSON.parse(file.readFileAsString('package.json'));
var eslintCfg = JSON.parse(file.readFileAsString(__dirname + '/config/eslintrc.json'));

var utils = {
  /**
   * Compare the a, b version
   * @param  {String} a
   * @param  {String} b
   * @return {Boolean}   a is larger than b?
   */
  versionCompare: function(a, b) {
    var aArr = a.split('.');
    var bArr = b.split('.');
    var larger = false;
    for (var i = 0; i < 3; i++) {
      if (parseInt(aArr[i], 10) === parseInt(bArr[i]), 10) {
      } else {
        larger = parseInt(aArr[i], 10) > parseInt(bArr[i], 10);
        break;
      }
    }
    return larger;
  },

  // commands runner

  /**
   * run a command under bash(shell)
   * @param  {String}   cmd  command name like 'git'
   * @param  {Array}   args Array of the argments of cmd like ['commit', '-m', 'first commit']
   * @param  {Function} fn   Callback when the command finished
   * @param  {Boolean}   sync shall we call this command synchornizedly
   */
  runCmd: function(cmd, args, fn, sync) {
    args = args || [];
    if (typeof fn === 'boolean') {
      sync = fn;
    }
    var runner = require('child_process')[sync ? 'spawnSync' : 'spawn']
    (cmd, args, {
      // keep color
      stdio: 'inherit',
    });
    if (!sync) {
      runner.on('close', function (code) {
        if (typeof fn === 'function') { fn(code); }
      });
    }
  },

  // package installer
  installPackage: function(pkg, version, global) {
    var type = global === true ? '-g' : '--save';
    type = global === 'dev' ? '--save-dev' : type;
    version = version || '';
    return utils.runCmd('npm', ['install', type, pkg + version]);
  },


  // getter functions
  getFromCwd: function() {
    var args = [].slice.call(arguments, 0);
    args.unshift(process.cwd());
    return path.join.apply(path, args);
  },
  getPkg: function() {
    return pkg;
  }
}

module.exports = utils;
