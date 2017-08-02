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
  sourcemaps = require('gulp-sourcemaps'),
  uglify  = require('gulp-uglify'),
  eslint  = require('gulp-eslint'),
  imagemin= require('gulp-imagemin')
  pngquant= require('imagemin-pngquant'),
  plumber = require('gulp-plumber')
  ;
let LessAutoprefix = require('less-plugin-autoprefix');
let autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

/*
gulp.task('sleep', () => console.log('sleeping'));
gulp.task('eat', () => console.log('eating'));
gulp.task('study', ['sleep', 'eat'], () => console.log('studing'));
*/

gulp.task('default', ['watch', 'server', 'dist'], () => {
  console.log('ok');
});

//生成目标代码
gulp.task('dist', ['clean','copy-html','less', 'sass', 'stylus', 'compile-js', 'compress-image']);

//实时监听index.html, 如果发生变化则让copy-html处理
// 监控对应的文件，实时编译
gulp.task('watch', ['watch-html', 'watch-less', 'watch-sass', 'watch-stylus', 'watch-js', 'lint']);

//监控html文件
gulp.task('watch-html', () => {
  return gulp.watch('index.html', ['copy-html']);
});

//监控less文件
gulp.task('watch-less', () => {
  return gulp.watch('src/styles/*.less', ['less']);
});

//监控sass文件，安装这个比较麻烦点
gulp.task('watch-sass', () => {
  // return gulp.watch('src/styles/*.s(a|c)ss', ['sass']);
});

//监控stylus文件
gulp.task('watch-stylus', () => {
  return gulp.watch('src/styles/*.styl', ['stylus']);
});
//监控js文件
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
// 拷贝文件到指定的目标
// HTML文件最小化
gulp.task('copy-html', () => {
  return gulp.src('index.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist/'))
  .pipe(connect.reload());
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
  /*
  return gulp.src([
    'src/styles/index.sass',
    'src/styles/footer.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(cssmin())
  .pipe(concat('bundle-sass.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css'))
  .pipe(connect.reload());
  */
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
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
});
//js代码检查
gulp.task('lint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
//压缩图片
gulp.task('compress-image', () => {
  return gulp.src('src/images/*')
    .pipe(imagemin({
        progressive: true,
        use: [pngquant()] //使用pngquant来压缩png图片
    }))
    .pipe(gulp.dest('dist/images/'));
});
