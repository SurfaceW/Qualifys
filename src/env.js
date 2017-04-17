const fs = require('fs');
const compareVersion = require('compare-versions');
const { getFileSync, info, getFromCwd, execSync } = require('./util');

class Env {
  constructor(conf) {
    this.version = conf.version;
    this.name = conf.name;
  }

  printVersion() {
    info('Qualifys: ' + this.version);
  }

  checkIfGitExist() {
    return fs.existsSync(getFromCwd() + '/.git');
  }

  checkIfNpmExist() {
    return fs.existsSync(getFromCwd() + '/package.json');
  }

  checkLatestVersion() {
    return compareVersion(
      this.version,
      execSync('npm info qualifys version').trim()
    ) >= 0;
  }
}

const pkg = getFileSync(__dirname + '/../package.json', true);
module.exports = new Env({
  version: pkg.version,
  name: pkg.name
});
