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

  var indexSpec = getFromCwd(content.filename || 'test/*.spec.js');
  console.log('TEST ENTRY PATH: ' + indexSpec);

  var files = [
    // // polyfill console
    // require.resolve('console-polyfill/index.js'),
    // // babel-polyfill support promise etc. features
    // require.resolve('babel-polyfill/dist/polyfill.js'),
    // require.resolve('es5-shim/es5-shim.js'),
    // require.resolve('es5-shim/es5-sham.js'),

    // inject React and ReactDOM to window object
    require.resolve('react/dist/react.js'),
    require.resolve('react-dom/dist/react-dom.js'),

    // other possible related dependencies
    // "https://g.alicdn.com/platform/c/rangy/1.3.0/rangy-core.min.js",
    // "https://g.alicdn.com/platform/c/tinymce/4.3.12/tinymce.min.js",

    // test files entry
    indexSpec
  ];

  try {
    fs.unlinkSync(process.cwd() + '/tmp.json');
  } catch (err) {}

  // webpackCfg.entry = [];
  var preprocessors = {};
  preprocessors[indexSpec] = ['webpack', 'sourcemap'];
  return {
    reporters: ['mocha'],
    autoWatch: true,
    browserDisconnectTimeout: 20000,
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
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },
    webpackServer: {
      // please don't spam the console when running in karma!
      noInfo: true,
    },
  };
};
