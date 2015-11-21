var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

function errorHandler(err) {
  console.log(err.toString());
  this.emit('end');
}
 
gulp.task('build', function () {
  browserify({
    entries: 'src/app.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify, { sourceMap: true, presets: ['es2015','react']})
  .bundle()
  .on('error', errorHandler)
  .pipe(source('app-debug.js'))
  .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js','src/**/*.jsx'], ['build']);
});
 
gulp.task('default', ['build']);