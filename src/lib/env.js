var env = {};

env.envCheck = function () {
  var colors = require('colors').setTheme({
    warn: ['red'],
    info: ['blue']
  });

  // if npm is not ready
  var fs = require('fs');
  try {
    var status = fs.statSync(process.cwd() + '/package.json');
  } catch (err) {
    console.log(('===== ERROR ===== \n' + err.message).warn);
    if (err.message.indexOf('package.json') > 0
      && err.message.indexOf('no such file or directory') > 0 ) {
      this.initNpm();
    }
  }

  // if git is ready
  try {
    var status = fs.statSync(process.cwd() + '/.git');
  } catch (err) {
    if (err.message.indexOf('no such file or directory') > 0) {
      this.initGit();
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

module.exports = env;
