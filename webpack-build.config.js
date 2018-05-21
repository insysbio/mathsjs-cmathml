'use strict';
const webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src',
  mode: 'production',
  output: {
    path: __dirname+'/dist',
    filename: 'mathjs.toCMathML.min.js'
  },
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
