const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
          ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/mystyles.css'),
    new Dotenv()
  ],
devServer: {
   historyApiFallback: true,
   contentBase: './dist',
   hot: true
},
};