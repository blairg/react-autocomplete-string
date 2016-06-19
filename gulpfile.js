/*
 * React Autocomplete String
 * Blair Garrett
 */

'use strict';

// Load some modules which are installed through NPM.
const eslint = require('gulp-eslint');

// Define some paths.
const paths = {
  js: ['./source/**/*.j*']
};

gulp.task('eslint', function() {
  return gulp.src(paths.js)
    .pipe(eslint());
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});


gulp.task('build', function(callback) {
  runSequence(['eslint'], callback);
});
gulp.task('default', ['watch']);
