var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  gulpDi = require('gulp-dependency-install'),
  gls = require('gulp-live-server');

gulp.task('npm-install', function () {
     return gulpDi.install('C:/Users/Fabian/Documents/GitHub/microlearning_client');
 });

gulp.task('serve', function() {

  //2. serve at custom port
  var server = gls.static('web', 8081);
  server.start();

});

gulp.task('css', function() {
  gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'src/css/**/*.css'
    ])
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('web/dist/css'));


});

gulp.task('js', function() {
  gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'src/js/**/*.js'
    ])
    .pipe(uglify().on('error', function(e) {
      console.log(e);
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('web/dist/js'));
});

gulp.task('images', function() {
  gulp.src([
      'src/images/**/*'
    ])
    .pipe(gulp.dest('web/dist/images'));
});

gulp.task('jsWatch', function() {
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('cssWatch', function() {
  gulp.watch('src/css/**/*.css', ['css']);
});

gulp.task('default', function() {
  gulp.run('js', 'css', 'images', "serve", "cssWatch", "jsWatch");
});
