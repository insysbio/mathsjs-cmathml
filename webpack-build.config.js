'use strict';
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './src/webpack',
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
