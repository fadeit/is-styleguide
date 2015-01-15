var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({
      advanced: true,
      aggressiveMerging: true
    });

gulp.task('less', function(){
  gulp.src('./src/style-guide.less')
      .pipe(less({
        plugins: [cleancss]
      }))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('this-styleguide', function(){
  gulp.src('./assets/this-styleguide.less')
      .pipe(less({
        plugins: [cleancss]
      }))
      .pipe(gulp.dest('./assets/'));
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.less', ['less']);
  gulp.watch('./assets/**/*.less', ['this-styleguide']);
});

gulp.task('default', ['less', 'this-styleguide', 'watch']);