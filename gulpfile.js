/*
 * React Autocomplete String
 * Blair Garrett
 */

'use strict';

// Load some modules which are installed through NPM.
const browserSync  = require('browser-sync');
const babel      = require('gulp-babel');
const babelify   = require('babelify');
const browserify = require('browserify');  // Bundles JS.
const concat     = require('gulp-concat');
const eslint     = require('gulp-eslint');
const gulp       = require('gulp');
const htmlmin    = require('gulp-htmlmin');
const imagemin         = require('imagemin');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const inject     = require('gulp-inject');
const less       = require('gulp-less');
const minifyCss  = require('gulp-minify-css');
const path       = require('path');
const reload     = browserSync.reload;
const rename     = require('gulp-rename');
const rmdir      = require('rmdir');
const runSequence = require('run-sequence');
const source     = require('vinyl-source-stream');
const uglify     = require('gulp-uglify');

// Define some paths.
const paths = {
  less:     ['./assets/less/'],
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

gulp.task('less', function () {
  return gulp.src(paths.less[0] + "*.less")
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./build/css/'));
});

//inject inline css into the index.html
gulp.task('injectcss', function() {
  gulp.src('./index.html')
    .pipe(inject(gulp.src(['./build/css/bundle.min.css']), {
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
         .pipe(gulp.dest('./build/js/'));
});

gulp.task('minify', function() {
  //js
  gulp.src('build/js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('build/js/'));

  //css
  gulp.src('build/css/bundle.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest('build/css/'));

  //html
  gulp.src('build/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(function(data){ return data.base; }));
});

gulp.task('images', function() {
  imagemin(['assets/images/*.{jpg,png}'], 'build/img/', {
  	use: [
  		imageminMozjpeg({targa: true}),
  		imageminPngquant({quality: '65-80'})
  	]
  }).then(files => {
  	//console.log(files);
  	//=> [{data: <Buffer 89 50 4e …>, path: 'build/foo.jpg'}, …]
  });

  gulp.src('build/img/assets/images/*', {base: './build/img/assets/images/'})
      .pipe(gulp.dest('build/img/'));
});

gulp.task('clean-build', function() {
  rmdir('./build/img/assets/', function (err, dirs, files) {
      console.log(dirs);
      console.log(files);
      console.log('all files are removed');
   });
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.less + "/demo.less", ['less']);
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
  runSequence(['eslint', 'less', 'js', 'injectcss', 'images'], 'clean-build', 'minify', callback);
});
gulp.task('default', ['build', 'browsersync', 'watch']);
