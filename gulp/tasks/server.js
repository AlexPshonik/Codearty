var gulp    = require('gulp');
var server  = require('browser-sync').create();
var config  = require('../config');

gulp.task('server', function () {
  server.init({
    server: {
      baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    files: [
      config.dest.html + '/*.html',
      config.dest.css + '/*.css',
      config.dest.img + '/**/*'
    ],
    port: 8080,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true
  });
});

module.export = server;