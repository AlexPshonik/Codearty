var gulp    = require('gulp');
var config  = require('../config');

gulp.task('watch',
  [
    'copy:watch',
    'pug:watch',
    'sass:watch',
    'js:watch'
]);