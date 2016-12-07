'use strict';

var path = require('path');
var getFromCwd = require('../util').getFromCwd;
var getKarmaCommonConfig = require('./getKarmaCommonConfig');
var assign = require('object-assign');

module.exports = function conf(config) {
  var commonConfig = getKarmaCommonConfig();
  var preprocessors = {};
  preprocessors[commonConfig.files[commonConfig.files.length - 1]] = ['webpack'];
  var reporters = ['progress', 'coverage'];
  var coverageReporter = {
    reporters: [
      {
        type: 'lcov',
        subdir: '.',
      },
      {
        type: 'text',
      },
    ],
    dir: getFromCwd('coverage/'),
  };
  if (process.env.TRAVIS_JOB_ID) {
    reporters = ['coverage', 'coveralls'];
  }
  commonConfig.webpack.module.postLoaders = [
    {
      test: /\.js$/,
      include: path.resolve('src/'),
      includePath: path.join(process.cwd()),
      loader: 'istanbul-instrumenter',
    },
  ];
  config.set(assign(commonConfig, {
    preprocessors: preprocessors,
    webpack: commonConfig.webpack,
    reporters: reporters,
    coverageReporter: coverageReporter,
    browsers: ['Chrome'],
    singleRun: true
  }));
};
