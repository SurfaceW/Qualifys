const karmaCommonConfig = require('./getKarmaCommonConfig');

module.exports = (config) => {
  config.set(Object.assign(karmaCommonConfig(), {
    // use chrome for more detail info
    browsers: ['PhantomJS'],
    singleRun: true,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered
      // (useful if karma exits without killing phantom)
      exitOnResourceError: true,
    },
  }));
};
