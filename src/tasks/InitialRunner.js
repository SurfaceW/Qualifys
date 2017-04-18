const Runner = require('../lib/Runner');

module.exports = class InitialRunner extends Runner {
  constructor(configs = {}) {
    super(Object.assign({}, {
      name: 'Init',
      commandAlias: 'init',
      description: 'Initialize default Environment'
    }, configs));
  }

  initialTest() {

  }

  initialConfigs() {

  }

  run(type, options) {

  }
}
