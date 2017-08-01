let gulp  = require('gulp'),
  connect = require('gulp-connect'),
  htmlmin = require('gulp-htmlmin'),
  less    = require('gulp-less'),
  cssmin  = require('gulp-cssmin'),
  rename  = require('gulp-rename'),
  del     = require('del'),
  concat  = require('gulp-concat'),
  // sass    = require('gulp-sass'),
  stylus  = require('gulp-stylus'),
  babel   = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps')
  ;
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

/*
gulp.task('sleep', () => console.log('sleeping'));
gulp.task('eat', () => console.log('eating'));
gulp.task('study', ['sleep', 'eat'], () => console.log('studing'));
*/

gulp.task('default', ['clean', 'copy-html', 'watch', 'server', 'less', 'stylus', 'compile-js'], () => {
  console.log('ok');
});
// 拷贝文件到指定的目标
// HTML文件最小化
gulp.task('copy-html', () => {
  return gulp.src('index.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist/'))
  .pipe(connect.reload());
});

//实时监听index.html, 如果发生变化则让copy-html处理
// 监控对应的文件，实时编译
gulp.task('watch', ['watch-html', 'watch-less', 'watch-sass', 'watch-stylus', 'watch-js'], () => {
});
gulp.task('watch-html', () => {
  return gulp.watch('index.html', ['copy-html']);
});
gulp.task('watch-less', () => {
  return gulp.watch('src/styles/*.less', ['less']);
});
gulp.task('watch-sass', () => {
  // return gulp.watch('src/styles/*.s(a|c)ss', ['sass']);
});
gulp.task('watch-stylus', () => {
  return gulp.watch('src/styles/*.styl', ['stylus']);
});
gulp.task('watch-js', () => {
  return gulp.watch('src/**/*.js', ['compile-js']);
});

// 开启一个服务器，实时预览
gulp.task('server', () => {
  connect.server({
    root: 'dist',//服务器根目录
    port: 8080,// 端口号
    livereload: true
  });
});

//清除dist目录下面的所有内容
gulp.task('clean', () => {
  del(['dist/*']);
});

//编译less文件并压缩，并放入生产环境
gulp.task('less', () => {
  return gulp.src([
      'src/styles/reset.less',
      'src/styles/header.less'
    ])
    //编译，加兼容性
    .pipe(less({
      plugins: [autoprefix]
    }))
    //最小化
    .pipe(cssmin())
    //合并到一个文件
    .pipe(concat('bundle-less.css'))
    //加.min后缀
    .pipe(rename({suffix: '.min'}))
    //放入目标目录
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});
gulp.task('sass', () => {
  return gulp.src([
    'src/styles/index.sass',
    'src/styles/footer.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(cssmin())
  .pipe(concat('bundle-sass.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css'));
});
gulp.task('stylus', () => {
  return gulp.src([
    'src/styles/layout.styl',
    'src/styles/main.styl'
  ])
  .pipe(sourcemaps.init())
  .pipe(stylus({
    compress: true,
    linenos: true
  }))
  .pipe(sourcemaps.write())
  .pipe(concat('bundle-stylus.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());
});
gulp.task('compile-js', () => {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
});
