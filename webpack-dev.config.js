'use strict';
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './src/browser',
  mode: 'production',
  output: {
    path: __dirname+'/demo',
    filename: 'mathjs-cmathml.min.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
