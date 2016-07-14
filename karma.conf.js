module.exports = function(config) {
  config.set({
    basePath: '',
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-webpack',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ],
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'tests.webpack.js', watched: false }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
      'source/*.js': ['coverage'],
      'source/*.jsx': ['coverage']
    },
    reporters: ['dots', 'progress', 'coverage', 'junit'],
    coverageReporter: {
      includeAllSources: true,
      type : 'html',
      dir : 'coverage'
    },
    // the default configuration
    junitReporter: {
      outputDir: 'junit/', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: 'React-Autocomplete-String Tests', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
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
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    },
  });
};