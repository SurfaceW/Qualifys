const expect = require('expect.js');
const env = require('../src/env');

describe('class: Env', () => {
  it('should printVersion correctly', () => {
    env.printVersion();
  });

  it('should check git correctly', () => {
    expect(env.checkIfGitExist()).to.be(true);
  });

  it('should check npm correctly', () => {
    expect(env.checkIfNpmExist()).to.be(true);
  });

  it('should check the recent version correctly', () => {
    expect(env.checkLatestVersion()).to.be(true);
  });
});
