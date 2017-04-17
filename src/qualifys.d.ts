// Type definitions for Qualifys 2.0.0
// Project: Qualifys
// Definitions by: surfacew surfacew@163.com

//  @see http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
interface Observable {};
// @see https://www.npmjs.com/package/commander
interface Commander {};
// https://webpack.js.org/concepts/
interface Webpack {};

declare enum TESTER_TYPE {
  'normal',
  'debug',
  'coverage'
}

export class TaskManager {
  private runners: Runner[];
  private runnerMap: { [runnerId: string]: Runner };

  constructor(runners: Runner[], commander: Commander);
  private runTaskRunner(taskName: string): void;

  init(): void;
  getRunner(name: string): Runner;
}

interface qfConfigs {
  loaders,
  noParse,
  sourceDirs,
  esPresets,
  happyPackLoaders,
  externals,
  externalFiles,
  testSpecFiles
}

export class ConfigManager {
  constructor(configs: qfConfigs, webpack);

  private _getProcessPath(extra: string): string;
  private _getDirnamePath(extra: string): string;

  private _getKarmaCommonConfig(): object;
  private _getWebpackCommonConfig(): object;

  private _getTestFiles(): string[];
  private _getExternalFiles(): string[];

  getChromeEnvConfig(): () => void;
  getPhantomJSEnvConfig(): () => void;
}

export class HelpCenter {
  printHelp(): void;
}

// Env support offering helpful information about the dev env
export class Env {
  readonly name: string;
  readonly version: string;
  readonly cwd: string;

  constructor(config: object);

  printVersion(): void;

  checkIfNpmExist(): boolean;
  checkIfGitExist(): boolean;
  checkLatestVersion(): boolean;
}

interface runnerConf {
  name: string;
  commandAlias: string | Array<string>;
  description: string;
  options: Array<string>;
}

export class Runner {
  readonly name: string;
  readonly runnerId: string;

  private commandAlias: string;
  private description: string;
  private options: [string, string];

  constructor(config: runnerConf);

  run(type: string, options: object): Promise<any>;
  stop(): Promise<any>;
}

export declare class InitialRunner extends Runner {
  initGit(): Promise<any>;
  initNpm(): Promise<any>;

  initialTest(): Promise<any>;
  initialConfigs(): Promise<any>;
  initialDir(): Promise<any>;
}

export class TestRunner extends Runner {
  runPhantomTest(): Promise<any>;
  runChromeTest(): Promise<any>;
  runTestCoverage(): Promise<any>;
}

export class UpgradeRunner extends Runner {
  update(): Promise<any>;
}

export module utils {
  function log(content: string, headLine: boolean): void;
  function info(content: string, headLine: boolean): void;
  function warn(content: string, headLine: boolean): void;
  function error(content: string, headLine: boolean): void;
  function success(content: string, headLine: boolean): void;

  function getFromCwd(): string;
  function getPkgStream(): Observable;

  // is a larger than b?
  function versionCompare(a: string, b: string): boolean;

  // options see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
  function exec(cmd: string, options: object): Observable;
  function execSync(cmd: string, options: object): Observable;

  function installPackage(pkg: string, version: string, installationType: boolean | string): Observable;
}

