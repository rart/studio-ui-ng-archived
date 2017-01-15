
var webpack = require("webpack");

// require("./stylesheet.css");

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './main.ts',
  output: {
    path: '../studio/fixtures',
    publicPath: 'dist/',
    filename: 'guest.js'
  },
  externals: {
    "amplify": "amplify"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};
