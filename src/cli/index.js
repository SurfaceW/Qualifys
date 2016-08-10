#!/usr/bin/env node

'use strict';

var program = require('commander');
var runCmd = require('../util').runCmd;
var colors = require('colors/safe').setTheme({
  info: ['blue'],
  warn: ['red'],
  success: ['green']
});

program.on('--help', function() {
  console.log('Usage'.info);
});


/**
 * Initialize the project
 */
program
  .command('init')
  .action(function () {
    try {
      require('../tasks/init').init();
    } catch (error) {
      console.log(error.message.warn);
    }
  });

program
  .command('add [name]')
  .action(function (name) {
    var task = require('../tasks/add')[name];
    if (task) {
      task && task(name);
      console.log(('Successfully add ' + name + ' file.').success);
    } else {
      console.log('No such command'.warn);
    }
  });

program.parse(process.argv);

var task = program.args[1];

// run specified gulp task
if (task && program.args[0] === 'run') {
  var gulp = require('gulp');
  console.log(('===== RUN TASK ' + task.toUpperCase() + ' =====').info);
  require('../gulpfile');
  gulp.start(task);
}


// https://github.com/tj/commander.js/pull/260
var proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', function() {
    process.exit(1);
  });
}
