var file = require('html-wiring');
var path = require('path');
var pkg = JSON.parse(file.readFileAsString('package.json'));
var eslintCfg = JSON.parse(file.readFileAsString(__dirname + '/config/eslintrc.json'));
var Promise = require('promise');
var git = require('git-rev');

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
  /**
   * run a command under bash(shell)
   * @param  {String}   cmd  command name like 'git'
   * @param  {Array}   args Array of the argments of cmd like ['commit', '-m', 'first commit']
   * @param  {Function} fn   Callback when the command finished
   * @param  {Boolean}   sync shall we call this command synchornizedly
   */
  runCmd: function(cmd, args, fn, sync) {
    args = args || [];
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
  getFromCwd: function() {
    var args = [].slice.call(arguments, 0);
    args.unshift(process.cwd());
    return path.join.apply(path, args);
  },
  getPkg: function() {
    return pkg;
  },
  getEslintCfg: function() {
    return eslintCfg;
  },
  getPackages: function() {
    var commands = [];
    for (var item in pkg.devDependencies) {
      if (item !== 'uxcore-tools') {
        commands.push(item + '@' + pkg.devDependencies[item]);
      }
    }
    commands.push('--production');
    return commands;
  },
  getQuestions: function() {
    var me = this;
    return new Promise(function(resolve, reject) {
      git.branch(function(branch) {
        var defaultBranch = branch;
        var defaultNpm = /@ali/.test(pkg.name) ? 'tnpm' : 'npm';
        var questions = [
          {
            type: 'input',
            name: 'version',
            message: 'please enter the package version to publish (should be xx.xx.xx)',
            default: pkg.version,
            validate: function(input) {
              if (/\d+\.\d+\.\d+/.test(input)) {
                if (me.versionCompare(input, pkg.version)) {
                  return true;
                } else {
                  return "the version you entered should be larger than now"
                }
              } else {
                return "the version you entered is not valid"
              }
            }
          },
          {
            type: 'input',
            name: 'branch',
            message: 'which branch you want to push',
            default: defaultBranch
          },
          {
            type: 'input',
            name: 'npm',
            message: 'which npm you want to publish',
            default: defaultNpm,
            validate: function(input) {
              if (/npm/.test(input)) {
                return true;
              } else {
                return "it seems not a valid npm"
              }
            }
          }
        ];
        resolve(questions);
      });
    })
  }
}

module.exports = utils;
