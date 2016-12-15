var fs = require('fs');
var file = require('html-wiring');
var colors = require('colors/safe');
var util = require('../util');
var path = require('path');
var shelljs = require('shelljs');

// gulp & gulp plugin
var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

// webpack conf
var webpack = require('webpack');
var webpackCfg = require('../config/webpack.dev.js');

var env = require('../lib/env');

// Run Karma
gulp.task('phantomjs', function (done) {
  env.checkTester();
  var karmaBin = require.resolve('karma/bin/karma');
  var karmaConfig = path.join(__dirname, '../config/karma.phantomjs.conf.js');
  var args = [karmaBin, 'start', karmaConfig];
  util.runCmd('node', args, (code) => {
    done(code);
  });
});

// 测试覆盖率
// line 行数测试
gulp.task('coverage', function (done) {
  if (fs.existsSync(util.getFromCwd('coverage'))) {
    shelljs.rm('-rf', util.getFromCwd('coverage'));
  }
  var karmaBin = require.resolve('karma/bin/karma');
  var karmaConfig = path.join(__dirname, '../config/karma.phantomjs.coverage.conf.js');
  var args = [karmaBin, 'start', karmaConfig];
  util.runCmd('node', args, done);
});

// run your unit tests across many browsers and platforms on Sauce Labs
gulp.task('saucelabs', function (done) {
  var karmaBin = require.resolve('karma/bin/karma');
  var karmaConfig = path.join(__dirname, '../config/karma.saucelabs.conf.js');
  var args = [karmaBin, 'start', karmaConfig];
  util.runCmd('node', args, done);
});

// start local browsers
gulp.task('browsers', function (done) {
  var karmaBin = require.resolve('karma/bin/karma');
  var karmaConfig = path.join(__dirname, '../config/karma.browsers.conf.js');
  var args = [karmaBin, 'start', karmaConfig];
  util.runCmd('node', args, done);
});

// only start chrome browser
gulp.task('test', function (done) {
  var karmaBin = require.resolve('karma/bin/karma');
  var karmaConfig = path.join(__dirname, '../config/karma.chrome.conf.js');
  var args = [karmaBin, 'start', karmaConfig];
  util.runCmd('node', args, done);
});
