/**
 * @author: @ProuteauK
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
var CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');


/*
 * Webpack Constants
 */
const METADATA = {
  title: 'indaym',
  baseUrl: '/'
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
  metadata: METADATA,
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.browser.ts'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/zone.js'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/ng2-bootstrap'),
          helpers.root('node_modules/ng2-translate'),
          helpers.root('node_modules/ng2-modal'),
          helpers.root('node_modules/jquery'),
          helpers.root('node_modules/ts-md5'),
          helpers.root('node_modules/ng2-dnd'),
        ]
      }
    ],
    loaders: [
      { test: /\.js$/,    loader: 'babel',      exclude: /node_modules/, query: { preset: ['es2015'] } },
      { test: /\.ts$/,    loader: 'ts-loader',  exclude: [/\.(spec|e2e)\.ts$/] },
      { test: /\.json$/,  loader: 'json-loader' },
      { test: /\.css$/,   loader: 'raw-loader' },
      { test: /\.html$/,  loader: 'raw-loader', exclude: [helpers.root('src/index.html')] }
    ]
  },
  plugins: [
    // new ForkCheckerPlugin(),
    // new OccurenceOrderPlugin(true),
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    new CopyWebpackPlugin([
      { from: '**/*.html',                                            to: 'app/components', context: 'src/app/components' },
      { from: '**/*.css',                                             to: 'app/components', context: 'src/app/components' },
      { from: 'src/assets',                                           to: 'assets' },
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',    to: 'assets/css/bootstrap.min.css' },
      { from: 'node_modules/bootstrap/dist/fonts',                    to: 'assets/fonts' },
      { from: 'node_modules/@angular2-material/core/style/core.css',  to: 'assets/css/core.css' }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
