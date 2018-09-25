var gulp          = require('gulp');
var include       = require('gulp-include');
var browserSynk   = require('browser-sync');
var babel         = require('gulp-babel');
var sourcemaps    = require('gulp-sourcemaps');
var uglify        = require('gulp-uglify');
var minify         = require('gulp-minify');
var rename        = require('gulp-rename');
var config        = require('../config');
reload = browserSynk.reload;

gulp.task('js', function () {
  gulp.src(config.src.js+'/**/*.js')
    // .pipe(rename({ suffix: '.min', prefix : '' }))
    // .pipe(include())
    // .pipe(babel())
    // .pipe(uglify())
    .pipe(minify({
      ext:{
        src:'.js',
        min:'.min.js'
      }
    }))
    .pipe(gulp.dest(config.dest.js+'/'))
    .pipe(reload({stream: true}));
});

gulp.task('js:watch', function () {
  gulp.watch(config.src.js + '/*', ['js'])
});