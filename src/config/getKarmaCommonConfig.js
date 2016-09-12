'use strict';

var fs = require('fs');
var getFromCwd = require('../util').getFromCwd;
var assign = require('object-assign');
var webpackCfg = require('./webpack.dev.js');

module.exports = function () {
  try {
    var content = JSON.parse(fs.readFileSync(process.cwd() + '/tmp.json', {
      encoding: 'utf-8'
    })) || {};
  } catch (err) {
    content = {};
  }

  var indexSpec

  try {
    fs.statSync('test/index.js');
    indexSpec = getFromCwd(content.filename || 'test/index.js');
  } catch (e) {
    indexSpec = getFromCwd('test/*.js');
  }

  var files = [
    require.resolve('console-polyfill/index.js'),
    // babel-polyfill support promise etc. features
    require.resolve('babel-polyfill/dist/polyfill.js'),
    require.resolve('es5-shim/es5-shim.js'),
    require.resolve('es5-shim/es5-sham.js'),
    indexSpec
  ];

  try {
    fs.unlinkSync(process.cwd() + '/tmp.json');
  } catch (err) {

  }

  // webpackCfg.entry = [];
  var preprocessors = {};
  preprocessors[indexSpec] = ['webpack', 'sourcemap'];
  return {
    reporters: ['mocha'],
    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',
        ui: 'bdd',
      },
    },
    frameworks: ['mocha'],
    files: files,
    preprocessors: preprocessors,
    webpack: assign(webpackCfg, {
      externals: {
        'react/addons': true,
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true
      },
    }),
    webpackServer: {
      // please don't spam the console when running in karma!
      noInfo: true,
    },
  };
};
