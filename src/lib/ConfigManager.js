const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const { getFromCwd } = require('../util');

// webpack configs
const externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
  'react/addons': true
};
const output = {
  path: path.join(getFromCwd(), './dist'),
  filename: '[name].js',
  sourceMapFileName: '[name].js.map'
};
const sources = ['./src', './test'];
const noParseRegExp = /react|jquery|lodash|ramda/;
const esPresets = ['react', 'latest'];
const happyPackLoaders = ['babel'];
const getLoaderExcludePath = path => !!path.match(/node_modules/);

// karma configs
const testSpecFiles = ['test/*.spec.js', 'test/*.test.js'];
const externalFiles = [
  // inject React and ReactDOM to window object
  require.resolve('react/dist/react.js'),
  require.resolve('react-dom/dist/react-dom.js')
];

module.exports = class ConfigManager {
  constructor(configs, webpack) {
    this.loaders = configs.loaders || [];
    this.noParse = configs.noParse || [];
    this.sourceDirs = sources.concat(configs.sourceFiles || []);
    this.esPresets = configs.esPresets || esPresets || [];
    this.happyPackLoaders = happyPackLoaders.concat(this.configs.happyPackLoaders);
    this.externals = configs.externals || externals;
    this.testSpecFiles = configs.testSpecFiles || testSpecFiles;
    this.externalFiles = configs.externalFiles || externalFiles;
  }

  _getProcessPath(extra) {
    return path.join([
      getFromCwd(),
      extra
    ]);
  }

  _getDirnamePath(extra) {
    return path.join([
      __dirname,
      extra
    ])
  }

  _getWebpackCommonConfig() {
    const noParse = [noParseRegExp].concat(this.noParse);
    const presets = this.esPresets.map(p =>
      require.resolve('babel-preset-' + p));
    const defaultLoaders = [{
      test: /\.js(x)*$/,
      exclude: getLoaderExcludePath,
      include: this.sourceDirs.map(this._getProcessPath),
      loader: ['happypack/loader?id=js'],
      query: { presets, cacheDirectory: true }
    }];

    return {
      cache: true,
      stats: 'errors-only',
      module: {
        noParse,
        loaders: defaultLoaders.concat(this.loaders)
      },
      externals: Object.assign({}, externals, this.externals),
      resolve: {
        modules: [this._getProcessPath('./node_modules')]
      },
      resolveLoader: {
        modules: [this._getDirnamePath('../../node_modules')]
      },
      plugins: [
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
        new webpack.SourceMapDevToolPlugin({
          columns: false
        }),
        new HappyPack({
          loaders: this.happyPackLoaders,
          id: 'js'
        })
      ]
    };
  }

  _getTestFiles() {
    return this.testSpecFiles.map(f => getFromCwd(f));
  }

  _getExternalFiles() {
    return this.externalFiles;
  }

  _getKarmaCommonConfig() {
    const preprocessors = {};
    this._getTestFiles().forEach(f => preprocessors[f] = [
      'webpack',
      'sourcemap'
    ]);
    return {
      reporters: ['mocha'],
      autoWatch: true,
      browserDisconnectTimeout: 20000,
      client: {
        mocha: {
          // change Karma's debug.html to the mocha web reporter
          reporter: 'html',
          ui: 'bdd',
        },
      },
      frameworks: ['mocha'],
      files: [].concat(
        this._getExternalFiles(),
        this._getTestFiles()),
      preprocessors,
      webpack: this._getWebpackCommonConfig(),
      webpackMiddleware: { stats: 'errors-only' },
      // please don't spam the console when running in karma!
      webpackServer: { noInfo: true },
    };
  }

  getChromeEnvConfig() {
    return (config) => {
      config.set(Object.assign({}, this._getKarmaCommonConfig(), {
        browsers: ['Chrome'],
        singleRun: false
      }));
    }
  }

  getPhantomJSEnvConfig() {
    return (config) => {
      config.set(Object.assign({}, this._getKarmaCommonConfig(), {
        browsers: ['PhantomJS'],
        singleRun: true,
      }));
    }
  }
}
