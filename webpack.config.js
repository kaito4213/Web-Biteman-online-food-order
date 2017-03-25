var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // 'react-hot-loader/patch',
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    './src/index',
    './src/css/custom'
  ],
  output: {
    path: path.join(__dirname, 'public') + '/static',
    filename: 'bundle.js'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', 'jpg']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.scss$/,
        use: [{loader: "style-loader"}, {loader: "css-loader"} ,{loader: "sass-loader"}]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader'
      }
    ]
  }
};
