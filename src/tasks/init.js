/**
 * Project Initializer
 */

var prompt = require('prompt');
var runCmd = require('../util').runCmd;
var install = require('../util').installPackage;
var fs = require('fs');
var colors = require('colors').setTheme({
  success: ['green'],
  info: ['blue'],
  warn: ['red']
});
var async = require('async');
var showError = function(err) { console.log(err.message.warn) }
var showSuccess = function() { console.log('==== RUN TASK SUCCESSFULLY ===='.success) }
var showTestLibOpt = function() {
  console.log('Enter for yes, enter \'no\' for nothing, enter a lib name to install your test lib.');
}
var copy = function(dist) {
  return function() {
    runCmd('cp', ['-r', __dirname + '/../static/' + dist, process.cwd()], true)
    console.log(('add ' + (dist ? dist : 'all') + ' template').success)
  }
}
var getTestUitlsFn = function(stdLib, libType) {
  return function(cb) {
    console.log('Do you want to use ' + stdLib.info + ' for ' + libType.info + '?');
    showTestLibOpt();
    prompt.get(['libname'], function(err, result) {
      if (err) showError(err);
      result.libname = result.libname || stdLib;
      cb(err, result);
    });
  }
}
var initTestLib = function() {
  console.log('==== TEST LIB SELECTION ===='.info);
  prompt.start();
  async.series([
    getTestUitlsFn('expect.js', 'assertion library'),
    getTestUitlsFn('sinon', 'mock / stub library'),
    getTestUitlsFn('enzyme', 'react ui test addon')
  ], function (err, results) {
    if (err) { showError(err) }
    results.forEach(function(item, index) {
      if (!item.libname) {
        install(stdLib, '', 'dev');
      } else if (item.libname === 'no' || item.libname === 'n') {
      } else if (typeof item.libname === 'string') {
        if (item.libname === 'sinon') {
          // sinon require special version specified
          install(item.libname, '@^2.0.0', 'dev');
        } else {
          install(item.libname, '', 'dev');
        }
      }
    });
    if (results[2].libname === 'enzyme') {
      // install the rely dependencies of enzyme
      install('react-dom', '', '');
      install('react', '', '');
      install('react-addons-test-utils', '', 'dev');
    }
    showSuccess();
  });

}

var operationsMap = {
  all: copy(''),
  test: copy('test'),
  npmignore: copy('.npmignore'),
  editorconfig: copy('.editorconfig'),
  eslintrc: copy('.eslintrc'),
  gitignore: copy('.gitignore'),

  // test env initialization
  testlib: initTestLib,
};
var dirs = ['src', 'dist', 'test'];

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
          console.log(('create dir /' + name).success);
        }
      });
      operationsMap.testlib();
    }
  }
}
