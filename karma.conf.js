module.exports = function(config) {
  config.set({
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-webpack',
      'karma-phantomjs-launcher',
    ],
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack']
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
      type: 'text'
    },
    singleRun: true,
    webpack: {
      module: {
        preLoaders: [
          // instrument only testing sources with Istanbul
          {
            test: /\.js$/,
            include: './source/',
            loader: 'istanbul-instrumenter'
          }
        ],
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};