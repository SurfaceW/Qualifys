const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
// const HappyPack = require('happypack');

const getLoaderExclude = (path) => !!path.match(/node_modules/);
const presets = ['latest', 'react', 'stage-1', 'stage-2'].map((item) => require.resolve('babel-preset-' + item));

module.exports = {
  cache: true,
  output: {
    path: path.join(process.cwd(), './dist'),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.js(x)*$/,
        // npm modules 都不需要经过 babel 解析
        exclude: getLoaderExclude,
        include: [
          path.join(process.cwd(), './src'),
          path.join(process.cwd(), './test')
        ],
        loader: 'babel-loader',
        query: {
          presets: presets,
          plugins: [],
          cacheDirectory: true
        }
      },
      {
        // svg loader
        test: /\.svg$/,
        loader: 'babel-loader',
        query: {
          presets: presets,
          cacheDirectory: true,
          babelrc: false
        }
      },
      {
        // svg loader
        test: /\.svg$/,
        loader: 'svg2react-loader'
      },
      {
        // less loader
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.join(process.cwd(), './node_modules'),
      path.join(__dirname, '../../node_modules')
    ]
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '../../node_modules')
    ]
  },
  externals: {
    react: 'var React', // 相当于把全局的React作为模块的返回 module.exports = React;
    'react-dom': 'var ReactDOM',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  stats: "errors-only",
  plugins: [
    // SourceMap plugin will define process.env.NODE_ENV as development
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      columns: false
    })
  ],
  devtool: 'source-map'
};
