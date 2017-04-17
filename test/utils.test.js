const expect = require('expect.js');
const {
  log, info, warn, error, success,
  versionCompare,
  exec, execSync,
  getFileSync,
  getFromCwd,
  getPkgStream
} = require('../src/util');

describe('Logger', () => {
  it('types of logger', (done) => {
    log('hello'),
    log('hello', true);
    info('tips');
    info('tips', true);
    warn('warn');
    warn('warn', true);
    error('error');
    error('error', true);
    success('win!');
    success('win!', true);
    done();
  });
});

describe('Exec / ExecSync', () => {
  it('should exec command correctly', (done) => {
    exec('echo 2').subscribe((r) => {
      expect(r.join('').trim()).to.be('2');
      done();
    });
  });

  it('should execSync command correctly', () => {
    expect(execSync('echo 2').trim()).to.be('2');
  });

  it('should correctly get current cwd', () => {
    expect(getFromCwd()).to.be.a('string');
  });

  it('getFile sync', () => {
    expect(getFileSync('package.json', true)).to.be.an('object');
    expect(getFileSync('package.json')).to.be.a('string');
  });
});
