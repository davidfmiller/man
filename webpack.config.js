
const
  path = require('path'),
  webpack = require('webpack'),
    terser = require('terser-webpack-plugin');

const config = {
  entry: './src/scripts/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs/'),
    filename: 'man.js'
  },
  watch: true,
  plugins: [
    new terser({
      extractComments: false,
      test: /\.js(\?.*)?$/i
    })
  ],
  module: {
    rules: [/*
      {
        test: /\.js$/,
//        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }
    */]
  }
};

module.exports = config;
