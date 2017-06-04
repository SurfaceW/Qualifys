const path = require('path');
const getFromCwd = require('../util').getFromCwd;
const getKarmaCommonConfig = require('./getKarmaCommonConfig');

module.exports = (config) => {
  const commonConfig = getKarmaCommonConfig();
  const preprocessors = {};
  preprocessors[commonConfig.files[commonConfig.files.length - 1]] = ['webpack'];
  const reporters = ['progress', 'coverage'];
  const coverageReporter = {
    reporters: [
      {
        type: 'lcov',
        subdir: '.',
      },
      {
        type: 'text',
        subdir: '.',
      },
    ],
    dir: getFromCwd('coverage/'),
  };

  // combine with the TRAVIS CI
  if (process.env.TRAVIS_JOB_ID) {
    reporters = ['coverage', 'coveralls'];
  }

  commonConfig.webpack.module.rules.push({
    test: /\.js$/,
    enforce: 'post',
    include: [path.join(process.cwd(), './src')],
    loader: 'istanbul-instrumenter-loader',
  });

  config.set(Object.assign(commonConfig, {
    preprocessors: preprocessors,
    webpack: commonConfig.webpack,
    reporters: reporters,
    coverageReporter: coverageReporter,
    browsers: ['Chrome'],
    singleRun: true,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered
      // (useful if karma exits without killing phantom)
      exitOnResourceError: true,
    },
  }));
};
