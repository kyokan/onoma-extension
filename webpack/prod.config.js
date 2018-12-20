const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const customPath = path.join(__dirname, './customPublicPath');

module.exports = {
  target: 'web',
  entry: {
    popup: [customPath, path.join(__dirname, '../chrome/extension/popup')],
    background: [customPath, path.join(__dirname, '../chrome/extension/background')],
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compressor: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  node: {
    fs: 'empty',
    path: 'empty',
  },
  resolve: {
    // extensions: ['*', '.js'],
    alias: {
      path$: 'path-browserify'
    },
    modules: ['node_modules'],
    extensions: ['-browser.js', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-optimize']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};
