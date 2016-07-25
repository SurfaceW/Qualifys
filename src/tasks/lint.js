var util = require('../util');
var path = require('path');

// gulp & gulp plugin
var gulp = require('gulp');
var eslint = require('gulp-eslint');

var colors = require('colors/safe');

colors.setTheme({
  success: ['green'],
  info: ['blue']
});

// Run Eslinter
gulp.task('lint', function(cb) {
  var eslintCfg = util.getEslintCfg();
  console.log('===== START LINTING ====='.info);
  gulp.src([
    path.join(process.cwd(), './src/**/*.js'),
    path.join(process.cwd(), './demo/**/*.js')
  ])
    .pipe(eslint(eslintCfg))
    .pipe(eslint.format('table'))
    .pipe(eslint.failAfterError());
});
