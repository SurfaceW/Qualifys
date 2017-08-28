#!/usr/bin/env node

'use strict'

const commander = require('commander');
const TaskManager = require('./lib/TaskManager');
const UpdateRunner = require('./tasks/updateRunner');
const InitialRunner = require('./tasks/initialRunner');
const TestRunner = require('./tasks/testRunner');


const taskManager = new TaskManager([
  new UpdateRunner(),
  new InitialRunner(),
  new TestRunner()
], commander);

taskManager.init();
