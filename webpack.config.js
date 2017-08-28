const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'qualifys.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/]
    }]
  },
  stats: "errors-only"
};
