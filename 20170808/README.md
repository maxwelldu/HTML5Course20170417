解决问题的思路：
- 遇到报错，在浏览器上看，在调试者工具上看，命令行，重装npm, 重装nodejs, 重装git bash, 重启电脑，百度翻译，百度，谷歌，stackoverflow, github, 找maxwell
搜索的时候一定要写关键字，

#Vue
渐进式的框架
SPA

运行环境：
如果你没使用构建工具，直接通过script标签把vue.js, vuex.js引入，这种情况，你是直接打开index.html即可
使用了vue-cli, 必须要通过localhost:8080访问

- 如果启动的时候报错误：:8080 看到这样的字眼，基本就是已经开启过一个vue的项目
- 运行之前先打开 localhost:8080, 如果没有显示服务找不到，说明你之前已经启动了一个vue的项目；如果你在命令行中按ctrl+z, 这个服务就会在后台运行，你需要手动的到任务管理器中的进程，找到node.exe的进程杀掉，再执行
- 如果你项目当中一直使用的是npm，则不要使用cnpm; 反之你一直在用cnpm, 则不要用npm
- 如果发现node_modules里面有很多下划线开头的这种文件夹，则表示是使用的cnpm
- 打开对应的编辑器，配置一下tab大小为2个空格，不会的话百度搜索一下，比如sublime tabsize调整
- 一次缩进是两个空格，不要tab和space混用
- 命令行，一定要知道当前在哪个目录，当前项目中的命令，你需要切换到项目根目录再执行
- 为了下载速度，推荐使用cnpm或者yarn, 配置cnpm别名, 在git bash里面执行；如果你在cmd中运行，则需要将下面的内容不换行，转成一行之后粘贴过去
```
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"
```
- cnpm config set loglevel http // 配置日志将网络请求也打印出来
- cnpm i -g vue-cli   // 如果已经安装过则不需要再安装, 安装完成则有vue这个命令，如果vue找不到，自己添加环境变量，安装完了会告诉你安装在什么位置
- vue init webpack vuex-demo
  7个回车，两个n, 按一下ctrl+c
- cd vuex-demo
- cnpm i


#小程序
注册一个邮箱：http://126.com  haixiaxiaxiaxia@126.com 12345asdfg
注册帐号： https://mp.weixin.qq.com/cgi-bin/wx haixiaxiaxiaxia@126.com 12345asdfg!@#$%
下载开发者工具：https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html
启动开发者工具：选择本地小程序项目
https://mp.weixin.qq.com/debug/wxadoc/dev/index.html
