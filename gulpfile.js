var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');


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
  .on('error', notify.onError("Error: <%= error.message %>"))
  .pipe(source('app-debug.js'))
  .pipe(gulp.dest('build'));
});

gulp.task('build:prod', function () {
  browserify({
    entries: 'src/app.jsx',
    extensions: ['.jsx'],
    debug: false
  })
  .transform(babelify, { sourceMap: false, presets: ['es2015','react']})
  .bundle()
  .on('error', notify.onError("Error: <%= error.message %>"))
  .pipe(source('app-release.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('build'));
});

gulp.task('export', ['build:prod'],function(){
  gulp.src(['*.php','build/app-release.js'])
  .pipe(gulp.dest('./export/'));

  gulp.src('index.html')
  .pipe(htmlreplace({
    'js': 'app-release.js'
  }))
  .pipe(gulp.dest('./export/'));
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js','src/**/*.jsx'], ['build']);
});
 
gulp.task('default', ['build']);
