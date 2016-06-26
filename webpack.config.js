const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const pkg = require('./package.json');
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }
};

// Default configuration. We will return this if
// Webpack is called outside of npm.
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    watchOptions: {
      poll: true
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        }
      ]
    },
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      alias: {
        config: path.join(__dirname, 'config', 'development')
      }
    }
  });
}

if(TARGET === 'build') {
  const entry = {};
  entry['vendor'] = Object.keys(pkg.dependencies);
  const env = {};
  env['process.env.NODE_ENV'] = JSON.stringify('production');
  module.exports = merge(common, {
    entry: entry,
    except: ['webpackJsonp'],
    devtool: 'source-map',
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: PATHS.app
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new CleanWebpackPlugin([PATHS.build], {
        root: process.cwd()
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor','manifest']
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true
        },
        mangle: {
          except: ['$'],
          screw_ie8 : true,
          keep_fnames: true
        }
      }),
      new webpack.DefinePlugin(env)
    ],
    resolve: {
      alias: {
        config: path.join(__dirname, 'config', 'production')
      }
    }
  });
}
