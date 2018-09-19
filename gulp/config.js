var util = require('gulp-util');

var srcPath   = './app';
var destPath  = './build';

var production = util.env.production || util.env.prod || false;

var config = {
  env : 'development',
  production: production,

  src : {
    root  : srcPath,
    pug   : srcPath + '/pug',
    sass  : srcPath + '/sass',
    js    : srcPath + '/js',
    img   : srcPath + '/img',
    fonts : srcPath + '/fonts'
  },

  dest : {
    root  : destPath,
    html  : destPath,
    css   : destPath + '/css',
    js    : destPath + '/js',
    img   : destPath + '/img',
    fonts : destPath + '/fonts'
  },

  setEnv: function(env) {
    if(typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function () {
    util.log(
      'Environment:',
      util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
    )
  },

  errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;