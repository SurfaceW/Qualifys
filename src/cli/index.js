#!/usr/bin/env node

'use strict';

var program = require('commander');
var runCmd = require('../util').runCmd;
var colors = require('colors/safe').setTheme({
  info: ['blue'],
  warn: ['red']
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

program.parse(process.argv);


// https://github.com/tj/commander.js/pull/260
var proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', function() {
    process.exit(1);
  });
}
