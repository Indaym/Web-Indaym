const helper = require('./helpers');

module.exports = function (config) {
  var testWebpackConfig = require ('./webpack.test.js');

  config.set ({
    basePath: helper.root('src'),
    frameworks: [
      'jasmine',
      'es6-shim'
    ],
    plugin: [
      'karma-phantomjs-launcher',
      'karma-es6-shim',
      'karma-babel-preprocessor',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'coverage',
      'webpack',
      'sourcemap'
    ],
    exclude: [],
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
      { pattern: '**/*.spec.ts'}
    ],
    preprocessors: {
      './config/spec-bundle.js': [ 'coverage', 'webpack', 'sourcemap' ],
      'src/**/*.ts': [ 'typescript' ]
    },
    typescriptPreprocessor: {
      option: { target: 'ES5' },
      transformPath: (path) => path.replace(/\.ts$/, '.js')
    },
    reporters: [ 'progress', 'dots', 'coverage' ],
    hostname: 'localhost',
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [ 'Chrome' ],
    singleRun: true,
    webpack: testWebpackConfig,
    coverageReporter: {
      dir: '../coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },
    webpackServer: { noInfo: true },
  });
};
