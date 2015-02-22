
var gulp = require('gulp')
  , jasmine = require('jasmine');


gulp.task('test', function() {
  return gulp.src('app/**/*.js')
    .pipe(jasmine({
      integration: true
    }));
});
