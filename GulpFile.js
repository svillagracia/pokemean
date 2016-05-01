const gulp       = require('gulp'),
      sass       = require('gulp-sass'),
      uglify     = require('gulp-uglify'),
      minify     = require('gulp-minify'),
      sourcemaps = require('gulp-sourcemaps'),
      strip      = require('gulp-strip-comments'),
      ngAnnotate = require('gulp-ng-annotate'),
      concat     = require('gulp-concat'),
      bytediff   = require('gulp-bytediff'),
      minifyCss  = require('gulp-minify-css'),
      jsSrc      = ['./public/src/scripts/app/app.js', './public/src/scripts/app/**/*.js'],
      jsOut      = './public/bld/scripts/',
      scss       = './public/src/styles/main.scss',
      css        = './public/bld/styles/',
      allSass    = './public/src/styles/**/*.scss';

gulp.task('sass', function () {
  gulp.src(scss)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(css));
});

gulp.task('scripts', function () {
  gulp.src(jsSrc)
  .pipe(sourcemaps.init())
  .pipe(concat('script.js', { newLine: ';' }))
  .pipe(strip())
  .pipe(ngAnnotate())
  .pipe(bytediff.start())
  .pipe(uglify({ mangle: true }))
  .pipe(bytediff.stop(function (data) {
    var diff = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' is ' + data.percent + '%' + diff;
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(jsOut));
});

gulp.task('default', function () {
  gulp.watch(allSass, ['sass']);
  gulp.watch(jsSrc, ['scripts']);
});