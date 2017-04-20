const karmaCommonConfig = require('./getKarmaCommonConfig');

module.exports = (config) => {
  config.set(Object.assign(karmaCommonConfig(), {
    browsers: ['Chrome']
  }));
};
