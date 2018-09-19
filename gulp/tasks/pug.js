var gulp      = require('gulp');
var pug       = require('gulp-pug');
var plumber   = require('gulp-plumber');
var config    = require('../config');

gulp.task('pug', function () {
  return gulp
    .src(config.src.pug + '/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }).on('error', config.errorHandler))
    .pipe(gulp.dest(config.dest.html));
});

gulp.task('pug:watch', function () {
  gulp.watch(config.src.pug + '/**/*.pug', ['pug']);
});