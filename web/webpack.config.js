// https://hackernoon.com/webpack-3-quickstarter-configure-webpack-from-scratch-30a6c394038a
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Every time we want to see our production ready dist folder, we need to delete the previous one. 
// Such a pain! clean-webpack-plugin is to remove/clean your build folder(s) before building.
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Configurations start here

const mode = process.env.NODE_ENV || 'development';

const entry = './src/app.ts';

const moduleRules = {
  rules: [
    {
      test: /\.ts?$/,
      include: /src/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.html$/,
      include: /src/,
      use: 'html-loader',
      exclude: /node_modules/,
    }
  ]
};

// Plugin section
const plugins = [
  // new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    title: 'Custom template 2',
    // Load a custom template (lodash by default see the FAQ for details)
    template: './src/html/template.html'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

const resolve = {
  extensions: [ '.ts', '.js' ]
};

const output = {
  // Output path using nodeJs path module
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};

// dev server config
const devServer = {
  contentBase: path.resolve(__dirname, "./dist"),
  compress: true,
  port: 5000,
  stats: 'errors-only',
  open: true,
  watchContentBase: true
};

// This option controls if and how source maps are generated. 
// With this feature, we know exactly where to look in order to fix/debug issues in our application. 
// Very very useful for development purpose, but should NOT use in production. 
const devtool = 'inline-source-map';

// Optimizations
// optimizations: {}

module.exports = {
  mode,
  entry,
  module: moduleRules,
  plugins,
  resolve,
  output,
  devServer,
  devtool
};
