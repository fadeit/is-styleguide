var gulp = require('gulp'),
    fs = require('fs'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    iconfont = require('gulp-iconfont'),
    LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({
      advanced: true,
      aggressiveMerging: true
    });

gulp.task('less', function(){
  gulp.src([
        './src/style-guide.less',
        './assets/generated-webfont.less'
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
      }))
      .pipe(gulp.dest('./assets/'));
});

gulp.task('copy-styleguide-fonts', function(){
  gulp.src([
        './assets/**/*-webfont.eot',
        './assets/**/*-webfont.svg',
        './assets/**/*-webfont.ttf',
        './assets/**/*-webfont.woff'
      ])
      .pipe(gulp.dest('./dist/styleguide-assets/fonts/'));
});

gulp.task('copy-styleguide-images', function(){
  gulp.src([
        './assets/images/**/*'
      ])
      .pipe(gulp.dest('./dist/styleguide-assets/images/'));
});

gulp.task('icon-fonts', function(){
  gulp.src(['./assets/icon-fonts/*.svg'])
      .pipe(iconfont({
        fontName: 'ols',
        appendCodepoints: true,
        normalize: true
      }))
      .on('codepoints', function(codepoints, options) {
        var i;
        var fileContents = '';

        for(i = 0; i <= codepoints.length - 1; i++){
          fileContents +=
            '.' + codepoints[i].name + ' {\n' +
              '  content: "\\E00' + (i + 1) + '";\n' +
            '}\n\n';
        }

        fs.writeFile('./assets/generated-webfont.less', fileContents);
      })
      .pipe(gulp.dest('./dist/styleguide-assets/fonts/'));
});

gulp.task('watch', function(){
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
  'copy-styleguide-fonts',
  'copy-styleguide-images',
  'icon-fonts',
  'less'
]);