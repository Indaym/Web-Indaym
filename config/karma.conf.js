const helper = require('./helpers');

module.exports = function (config) {
  var testWebpackConfig = require ('./webpack.test.js');

  config.set ({
    basePath: helper.root('src'),
    frameworks: [ 'jasmine' ],
    plugin: [
      'karma-babel-preprocessor',
      'karma-jasmine',
      'karma-chrome-launcher',
      'coverage',
      'webpack',
      'sourcemap'
    ],
    exclude: [],
    files: [
      { pattern: './config/spec-bundle.js', watched: false },
      { pattern: '**/*.spec.ts' }
    ],
    preprocessors: {
      './config/spec-bundle.js': [ 'coverage', 'webpack', 'sourcemap' ],
      'src/**/!(*spec).ts': [ 'typescript' ]
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
    browsers: [ 'ChromeCustom' ],
    customLaunchers: {
      ChromeCustom: {
        base: 'Chrome',
        flags: ['--ne-sandbox', '--single-process']
      }
    },
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
