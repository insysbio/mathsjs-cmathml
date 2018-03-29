const webpack = require("webpack"),
      CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: __dirname+"/demo/browser",
    filename: "bundle.js"
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: './src/index.html',
          to: "index.html"
        }
      ]
    )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
        presets: ['es2015']
      }
      },
      {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
      {
        "test": /\.(xsl|svg|png|eot|ttf|woff|woff2)$/,
        use: [
          'file-loader'
        ]
      }
     ]
   }
}
