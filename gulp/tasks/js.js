var gulp          = require('gulp');
var include       = require('gulp-include');
var browserSync   = require('browser-sync');
var babel         = require('gulp-babel');
var sourcemaps    = require('gulp-sourcemaps');
var concat        = require('gulp-concat');
var minify        = require('gulp-minify');
var rename        = require('gulp-rename');
var config        = require('../config');

gulp.task('js', function() {
	return gulp.src([
    'app/js/libs/jquery.js',
    'app/js/libs/anime.js',
    'app/js/libs/three.js',
    'app/js/libs/orbitControls.js',
    'app/js/libs/jquery.translate.js',
		'app/js/app.js', // Always at the end
		])
	.pipe(concat('scripts.js'))
	.pipe(minify({
    ext:{
      src:'.js',
      min:'.min.js'
    }
  }))
	.pipe(gulp.dest(config.dest.js+'/'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js:watch', function () {
  gulp.watch(config.src.js + '/*', ['js'])
});