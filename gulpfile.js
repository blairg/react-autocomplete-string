/*
 * React Autocomplete String
 * Blair Garrett
 */

'use strict';

const esLint = require('gulp-eslint');
const gulp = require('gulp');


// Define some paths.
const paths = {
  js: ['./source/**/*.j*']
};

gulp.task('eslint', function() {
  return gulp.src(paths.js)
    .pipe(esLint());
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['eslint']);

