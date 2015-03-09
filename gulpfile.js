/*jshint strict:false, node:true */

var gulp = require('gulp')
  , jasmine = require('gulp-jasmine-phantom')
  , jshint = require('gulp-jshint');

var paths = {
  scripts: 'app/components/**/*.js'
};

gulp.task('default', [
  'lint',
  'test'
]);

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src(paths.scripts)
    .pipe(jasmine({
      vendor: [
        'bower_components/d3/d3.min.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js'
      ],
      integration: true,
      abortOnFailure: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'test']);
});
