/*
 * React Autocomplete String
 * Blair Garrett
 */

'use strict';

// Load some modules which are installed through NPM.
var browserSync  = require('browser-sync');
var babel      = require('gulp-babel');
var babelify   = require('babelify');
var browserify = require('browserify');  // Bundles JS.
var concat     = require('gulp-concat');
var eslint     = require('gulp-eslint');
var gulp       = require('gulp');
var htmlmin    = require('gulp-htmlmin');
var inject     = require('gulp-inject');
var minifyCss  = require('gulp-minify-css');
var reload     = browserSync.reload;
var rename     = require('gulp-rename');
var runSequence = require('run-sequence');
var sass       = require('gulp-sass');
var source     = require('vinyl-source-stream');
var uglify     = require('gulp-uglify');

// Define some paths.
var paths = {
  css:      ['./assets/scss/*.scss'],
  app_js:   ['./assets/js/src/components/app.jsx'],
  js_src:   ['./assets/js/src/'],
  js:       ['./assets/js/src/**/*.j*'],
  vendor:   ['./assets/js/src/vendor/typed.min.js'],
  demo:     ['./assets/js/src/components/demo.js']
};

gulp.task('eslint', function() {
  return gulp.src(paths.js)
    .pipe(eslint());
});

// Our CSS task. It finds all our Stylus files and compiles them.
gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(concat('bundle.css'))
    .pipe(sass())
    .pipe(gulp.dest('./build'));
});

//inject inline css into the index.html
gulp.task('injectcss', function() {
  gulp.src('./index.html')
    .pipe(inject(gulp.src(['./build/bundle.min.css']), {
      starttag: '<!-- inject:head:css -->',
      transform: function (filePath, file) {
        // return file contents as string
        return "<style>" + file.contents.toString('utf8') + "</style>";
      }
    }))
    .pipe(gulp.dest('build/'));
});


// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
  return browserify([paths.vendor, paths.demo, paths.app_js])
         .transform('babelify', {presets: ['es2015', 'react']})
         .bundle()
         .pipe(source('bundle.js'))
         .pipe(gulp.dest('./build'));
});

gulp.task('minify', function() {
  //js
  gulp.src('build/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('build/'));

  //css
  gulp.src('build/bundle.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('build/'));

  //html
  gulp.src('build/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(function(data){ return data.base; }));
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

// BrowserSync
gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', function(callback) {
  runSequence(['eslint', 'css', 'js', 'injectcss'], 'minify', callback);
});
gulp.task('default', ['build', 'browsersync', 'watch']);
