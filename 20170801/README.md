#Gulp
用自动化构建工具增强你的工作流程！

工作流程：
  HTML,CSS,JS
  HTML5,CSS3,ES6,ES7,ES8,NodeJS,Vue,React,Angular,TypeScript, Less, Sass, Stylus, Postcss
  通过类似webstorm的IDE工具，实现自动编译
构建工具：
  帮我们把Less,Sass,Stylus实时编译成css
  帮我们把ES6,ES7,ES8,TypeScript实时编译成ES5或ES3
  帮我们把压缩文件，合并文件
  提供一个实时同步的服务器
自动化：
  gulpfile.js
  gulp


Gulp的使用：
  安装：
    npm i -g gulp
    npm i -D gulp
    vim gulpfile.js
    gulp

  处理HTML：
    拷贝文件到指定的目标
    HTML文件最小化
    监控对应的文件，实时编译
    开启一个服务器，实时预览
  处理CSS：
    编译Less, sass, stylus文件
    使用autoprefix插件
    CSS文件最小化
    CSS文件合并
    拷贝到目标位置
  处理JS:
    babel转换ES6代码到ES5
    uglify js压缩
    eslint
    typescript
