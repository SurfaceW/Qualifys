'use strict';

const fs = require('fs');
const getFromCwd = require('../util').getFromCwd;
const webpackCfg = require('./webpack.dev.js');

module.exports = function () {
  let testSpecs = ['test/*.test.js', 'test/*.spec.js'].map(t => getFromCwd(t));
  // if we declare the specific test entry file
  if (process.env && process.env.file) {
    testSpecs = [path.join(getFromCwd(), env.file)];
  }
  console.log('TEST ENTRY PATH: \n' + testSpecs.join('\n'));
  const files = [
    // inject React and ReactDOM to window object
    require.resolve('react/dist/react.js'),
    require.resolve('react-dom/dist/react-dom.js'),
  ].concat(testSpecs);

  const preprocessors = {};
  testSpecs.forEach(t => preprocessors[t] = ['webpack', 'sourcemap']);
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
    webpack: Object.assign(webpackCfg, {
      externals: {
        'react/addons': true,
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true
      },
    }),
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      stats: 'errors-only'
    },
    webpackServer: {
      // please don't spam the console when running in karma!
      noInfo: true
    },
  };
};
