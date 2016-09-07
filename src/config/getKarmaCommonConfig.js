'use strict';

var fs = require('fs');
var getFromCwd = require('../util').getFromCwd;
var assign = require('object-assign');
var webpackCfg = require('./webpack.dev.js');
var data = require('../lib/data').data;

module.exports = function () {
  var content = JSON.parse(fs.readFileSync(process.cwd() + '/tmp.json', {
    encoding: 'utf-8'
  })) || {};
  var indexSpec = getFromCwd(content.filename || 'test/index.js');
  var files = [
    require.resolve('console-polyfill/index.js'),
    require.resolve('es5-shim/es5-shim.js'),
    require.resolve('es5-shim/es5-sham.js'),
    indexSpec
    // content.filename ? require.resolve(getFromCwd(content.filename)) : indexSpec,
  ];
  fs.unlinkSync(process.cwd() + '/tmp.json');
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
      externals: {},
    }),
    webpackServer: {
      // please don't spam the console when running in karma!
      noInfo: true,
    },
  };
};
