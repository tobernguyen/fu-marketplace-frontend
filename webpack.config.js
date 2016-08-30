const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
  },
  externals: {
    onesignal: 'OneSignal'
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
    output: {
      publicPath: '/'
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

if(TARGET === 'staging') {
  module.exports = merge(common, {
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies)
    },
    except: ['webpackJsonp'],
    devtool: 'source-map',
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin([PATHS.build], {
        root: process.cwd()
      }),
      new HtmlWebpackPlugin({
        template: 'build_templates/index.html.staging'
      }),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor','manifest']
      }),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
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
      new CompressionPlugin({
        asset: '[file].gz',
        minRatio: 0,
        regExp: /\.(js|html|css)$/
      }),
      new CopyWebpackPlugin([
        { from: path.join(__dirname, 'build_templates', 'manifest.json.staging'), to: 'manifest.json' },
        { from: path.join(__dirname, 'build_templates', 'OneSignalSDKUpdaterWorker.js') },
        { from: path.join(__dirname, 'build_templates', 'OneSignalSDKWorker.js') },
        { from: path.join(__dirname, 'build_templates', 'logo.png') },
        { from: path.join(__dirname, 'build_templates/favicon') }
      ])
    ],
    resolve: {
      alias: {
        config: path.join(__dirname, 'config', 'staging')
      }
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: PATHS.app
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: PATHS.app
        }
      ]
    }
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies)
    },
    except: ['webpackJsonp'],
    devtool: 'source-map',
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin([PATHS.build], {
        root: process.cwd()
      }),
      new HtmlWebpackPlugin({
        template: 'build_templates/index.html.production'
      }),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor','manifest']
      }),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
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
      new CompressionPlugin({
        asset: '[file].gz',
        minRatio: 0,
        regExp: /\.(js|html|css)$/
      }),
      new CopyWebpackPlugin([
        { from: path.join(__dirname, 'build_templates', 'manifest.json.production'), to: 'manifest.json' },
        { from: path.join(__dirname, 'build_templates', 'OneSignalSDKUpdaterWorker.js') },
        { from: path.join(__dirname, 'build_templates', 'OneSignalSDKWorker.js') },
      ])
    ],
    resolve: {
      alias: {
        config: path.join(__dirname, 'config', 'production')
      }
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: PATHS.app
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: PATHS.app
        }
      ]
    }
  });
}
