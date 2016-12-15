#!/usr/bin/env node

'use strict'

var fs = require('fs')
var program = require('commander')
var assign = require('lodash').assign;
var colors = require('colors/safe').setTheme({
  info: ['blue'],
  warn: ['red'],
  success: ['green']
})
var runCmd = require('./util').runCmd
var updater = require('./tasks/update')

// version and help info
program
  .version(updater.getVersion())
  .option('-v, --show-version', 'show help information.')

if (program.version) {
  updater.showVersion()
}

// tool update
program
  .command('update')
  .action(function () {
    updater.update()
  })

// project initializer
program
  .command('init [name]')
  .action(function (name) {
    try {
      require('./tasks/init').init(name)
    } catch (error) {
      console.log(error.message.warn)
    }
  })

// project file generation
program
  .command('add [name]')
  .action(function (name) {
    var task = require('./tasks/add')[name]
    if (task) {
      task && task(name)
      console.log(('Successfully add ' + name + ' file.').success)
    } else {
      console.log('No such command'.warn)
    }
  })

// QA Tasks series

var gulp = require('gulp');

function runGulpTask(task, options) {
  console.log(('===== RUN TASK ' + task.toUpperCase() + ' =====').info)
  var optionObj = options || {};
  try {
    require('./gulpfile')
    optionObj.before && optionObj.before(options);
    gulp.start(task);
  } catch (e) {
    console.log(('Task Error: ' + e.message).warn);
  }
  optionObj.after && optionObj.after(options);
}

// execute unit test
program
  .command('test')
  .option('-f, --file [filename]', "Which filt to use as entrance")
  .action(function(options) {
    runGulpTask('test', {
      before: function() {
        // run specified gulp task
        if (options.file) {
          // save optional file name to local file
          fs.writeFileSync(process.cwd() + '/tmp.json', JSON.stringify({ filename: options.file }))
        }
      }
    });
  });

program
  .command('coverage')
  .action(runGulpTask.bind(null, 'coverage'))


program
  .command('lint')
  .action(runGulpTask.bind(null, 'lint'))

program.parse(process.argv)

// https://github.com/tj/commander.js/pull/260
var proc = program.runningCommand
if (proc) {
  proc.on('close', process.exit.bind(process))
  proc.on('error', function () {
    process.exit(1)
  })
}
