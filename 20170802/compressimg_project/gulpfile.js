let gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant');

gulp.task('default', () => {
  gulp.src('src/images/*.png')
  .pipe(imagemin({
      progressive: true,
      use: [pngquant()] //使用pngquant来压缩png图片
  }))
  .pipe(gulp.dest('dist/images/'));
});
