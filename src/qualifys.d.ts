// Type definitions for Qualifys 2.0.0
// Project: Qualifys
// Definitions by: surfacew surfacew@163.com

declare enum TESTER_TYPE {
  'normal',
  'debug',
  'coverage'
}

export class TaskManager {
  constructor(runners: Runner[]);

  private runTaskRunner(taskName: string): void;
  private registerRunner(runners: Runner[]): void;
  private registerRunner(runner: Runner): void;

  init(): void;
}

export class ConfigManager {
  private _getKarmaCommonConfig(): object;
  private _getWebpackConfig(): object;

  getChromeEnvConfig(): object;
  getPhantomjsEnvConfig(): object;
}

export class HelpCenter {
  printGuide(): void;
}

// Env support offering helpful information about the dev env
export class Env {
  readonly version: string;
  readonly cwd: string;

  printVersion(): void;

  checkIfNpmExist(): boolean;
  checkIfGitExist(): boolean;
  checkTestDependencies(): boolean;
  checkLatestVersion(): boolean;
}

export class Runner {
  readonly name: string;
  readonly runnerId: string;

  run(type: string): Promise<any>;
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
  function warn(content: string, headLine: boolean): void;
  function error(content: string, headLine: boolean): void;
  function success(content: string, headLine: boolean): void;
  // is a larger than b?
  function versionCompare(a: string, b: string): boolean;
  function runCmd(cmd: string, args: Array<string>, async: boolean): Promise<any>;
  function installPackage(pkg: string, version: string, globalInstall: boolean): Promise<any>;
  function getFromCwd(): string;
  function getPkg(): { [packageProp: string]: any };
}

