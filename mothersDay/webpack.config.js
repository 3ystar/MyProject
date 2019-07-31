var webpack = require('webpack');
module.exports = {
  entry: [
    './dist/main.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'main.bundle.js'
  }
  // module: {
  //   loaders: [
  //     // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
  //     // { test: /\.css$/, loader: "style!css" },
  //     // {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
  //   ]
  // }
};