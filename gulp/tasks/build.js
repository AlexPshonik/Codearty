var gulp          = require('gulp');
var runSequence   = require('run-sequence');
var config        = require('../config');

function build(){
  runSequence(
    'clean',
    'pug',
    'sass',
    'js',
    'copy'
  )
}

gulp.task('build', function () {
  config.setEnv('development');
  config.logEnv();
  build();
});

gulp.task('build:prod', function () {
  config.setEnv('production');
  config.logEnv();
  build();
});