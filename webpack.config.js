/**
 * webpack.config.js
 * Webpack configuration for webpack dev server.
 */

// Node Modules
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: {
    index: ['./src']
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
};
