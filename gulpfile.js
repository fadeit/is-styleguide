var gulp = require('gulp'),
    fs = require('fs'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    svgSprite = require('gulp-svg-sprite'),
    LessPluginCleanCSS = require("less-plugin-clean-css"),
    jshint = require('gulp-jshint'),
    cleancss = new LessPluginCleanCSS({
      advanced: true,
      aggressiveMerging: true
    });

gulp.task('less', function(){
  gulp.src([
        './src/style-guide.less',
        './assets/sprites/sprite.less'
      ])
      .pipe(less({
        plugins: [cleancss]
      }))
      .pipe(concat('ols-style-guide.css'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('this-styleguide', function(){
  gulp.src('./assets/this-styleguide.less')
      .pipe(less({
        plugins: [cleancss]
      }).on('error', function(e) {console.log(e)}))
      .pipe(gulp.dest('./assets/'));
});

gulp.task('jshint', function() {
  return gulp.src('./assets/this-styleguide.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy-styleguide-fonts', function(){
  gulp.src([
        './assets/**/*-webfont.eot',
        './assets/**/*-webfont.svg',
        './assets/**/*-webfont.ttf',
        './assets/**/*-webfont.woff'
      ])
      .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('copy-styleguide-images', function(){
  gulp.src([
        './assets/images/**/*'
      ])
      .pipe(gulp.dest('./dist/images/'));
});

gulp.task('copy-styleguide-sprites', function(){
  gulp.src([
        './assets/sprites/**/*.svg'
      ])
      .pipe(gulp.dest('./dist/'));
});

gulp.task('svg-sprites', function(){
  var config = {
    shape: {
      spacing: {
        padding: 10
      }
    },
    mode: {
      css: {
        dest: '',
        prefix: 'ols-',
        sprite: 'images/svg-sprite.svg',
        bust: false,
        dimensions: true,
        layout: 'vertical',
        render: {
          less: true
        }
      }
    }
  };

  gulp.src('./assets/svg/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./assets/sprites/'));
});

gulp.task('watch', function(){
  gulp.watch('./assets/**/*.js', ['jshint']);
  gulp.watch('./src/**/*.less', ['dist']);
  gulp.watch('./assets/**/*.less', ['example-page']);
});

gulp.task('default', [
  'example-page',
  'dist',
  'watch'
]);

gulp.task('example-page', [
  'this-styleguide'
]);

gulp.task('dist', [
  'jshint',
  'copy-styleguide-fonts',
  'copy-styleguide-images',
  'svg-sprites',
  'copy-styleguide-sprites',
  'less'
]);