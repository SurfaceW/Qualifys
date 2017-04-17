const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { Observable } = require('rxjs');
const colors = require('colors');

const COLOR_MAP = {
  'info': 'blue',
  'warn': 'yellow',
  'error': 'red',
  'success': 'green'
};

const readFileAsObservable = Observable.bindNodeCallback(fs.readFileSync);
const execAsObservable = Observable.bindNodeCallback(exec);
const addHeadLine = (c, headline) => headline ? '========== ' + c + ' ==========' : c;
const logWithType = (c, type) => {
  if (!type) {
    console.log(c);
  } else {
    console.log(colors[COLOR_MAP[type]](c));
  }
}

const utils = {
  // logger series
  log: (content, headline) => {
    logWithType(addHeadLine(content, headline), null);
  },
  info: (content, headline) => {
    logWithType(addHeadLine(content, headline), 'info');
  },
  warn: (content, headline) => {
    logWithType(addHeadLine(content, headline), 'warn');
  },
  error: (content, headline) => {
    logWithType(addHeadLine(content, headline), 'error');
  },
  success: (content, headline) => {
    logWithType(addHeadLine(content, headline), 'success');
  },
  exec: (cmd = '', options = {
    // keep color
    stdio: 'inherit',
    encoding: 'utf-8',
    timeout: 10000
  }) => {
    return execAsObservable(cmd, options);
  },

  execSync: (cmd = '', options = {
    timeout: 10000,
    encoding: 'utf-8'
  }) => {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      try {
        resolve(execSync(cmd, options));
      } catch (e) {
        reject(e.error || 'execSync error, please check the command.');
      }
    }));
  },

  // package installer
  installPackage: function(pkg, version, installationType) {
    let type = installationType ? '-g' : '--save';
    type = installationType === 'dev' ? '--save-dev' : type;
    version = version || '';
    return utils.execSync('npm install ', [type, pkg + version].join(' '));
  },

  getFromCwd: function() {
    const args = [].slice.call(arguments, 0);
    args.unshift(process.cwd());
    return path.join.apply(path, args);
  },

  getPkgStream: function() {
    return readFileAsObservable('package.json', { encoding: 'utf-8' })
      .map(v => JSON.parse(v));
  }
}

module.exports = utils;
