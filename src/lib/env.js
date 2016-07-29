var env = {};

env.envCheck = function () {
  var colors = require('colors').setTheme({
    warn: ['red'],
    info: ['blue']
  });

  // if npm is not ready
  var fs = require('fs');

  console.log('===== START CHECK ENV ====='.info);

  // if git is ready
  try {
    var status = fs.statSync(process.cwd() + '/.git');
  } catch (err) {
    showErr(err.message);
    if (err.message.indexOf('no such file or directory') > 0) {
      this.initGit();
    }
  }

  try {
    var status = fs.statSync(process.cwd() + '/package.json');
  } catch (err) {
    showErr(err.message);
    if (err.message.indexOf('package.json') > 0
      && err.message.indexOf('no such file or directory') > 0 ) {
      this.initNpm();
    }
  }
}

env.initNpm = function () {
  console.log('===== Initialized NPM ====='.info);
  require('child_process').spawnSync('npm', ['init'], { stdio: 'inherit' });
}

env.initGit = function () {
  console.log('===== Initialized Git ====='.info);
  require('child_process').spawnSync('git', ['init'], { stdio: 'inherit' });
}

function showErr(msg) {
  console.log(('===== ERROR ===== \n' + msg).warn);
}

module.exports = env;
