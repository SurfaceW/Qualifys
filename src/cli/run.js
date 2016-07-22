#!/usr/bin/env node

'use strict';

var program = require('commander');
var colors = require('colors/safe');

colors.setTheme({
  info: ['green'],
  list: ['blue']
});

program.on('--help', function() {
  console.log(colors.info('Usage'));
  console.log(colors.blue('$ uxcore-tools run build'), 'compile src files to es3 standard')
});

program.parse(process.argv);

var task = program.args[0];

// run specified gulp task
if (!task) {
  program.help()
} else {
  var gulp = require('gulp');
  require('../gulpfile');
  gulp.start(task);
}
