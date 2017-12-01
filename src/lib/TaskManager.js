const env = require('../env');
const helper = require('../lib/help');

module.exports = class TaskManager {
  constructor(runners, commander) {
    this.commander = commander;
    this.runners = runners || [];
    this.runnerMap = {};
    this.runners.forEach(r => this.runnerMap[r.name] = r);
  }

  init() {
    const helperFn = helper.printHelp.bind(helper);
    this.commander.version(env.version);
    this.runners.forEach(r => {
      let c = this.commander;
      c = c.command(r.command);
      if (r.description) c.description(r.description);
      if (r.options) {
        r.options.map(o => c.option(o[0], o[1]));
      }
      c.action(r.run.bind(r));
    });
    this.commander.on('--help', helperFn);
    this.commander.command('*').action(helperFn);
    this.runTaskRunner();
    return this;
  }

  getRunner(name = 'default') {
    return this.runnerMap[name];
  }

  runTaskRunner() {
    // https://github.com/tj/commander.js/pull/260
    const proc = this.commander.runningCommand;
    if (proc) {
      proc.on('close', process.exit.bind(process));
      proc.on('error', () => process.exit(1));
    }
    this.commander.parse(process.argv);
    return this;
  }
}
