wamp会安装
echo
变量 $开头，不用声明
连字符 .
数据类型
变量作用域
运算符
数组
最常用的函数：数组操作，字符串操作，数据库操作
http://php.net/manual/zh/ref.strings.php
http://php.net/manual/zh/book.mysqli.php
http://php.net/manual/zh/ref.array.php
header()
超全局数组
http://php.net/manual/zh/reserved.variables.php
  $_SERVER
  $_GET
  $_POST

  http://localhost/web1704/03-php-call-api.php
  GET
  m=18518368050

curl http://php.net/manual/zh/ref.curl.php

PHP学习达到的效果
- 自己会写API，从数据库进行增删改查
- 会写传统的动态网站，表单提交，删，修改，查询

文件的后缀名是.PHP
一定要放到web网站根目录
打开web服务器wamp
访问的时候一定要写 http://127.0.0.1/xxx.php
php主要就是用来做快速网站开发，所以PHP文件当中可以直接写html骨架和内容
php的代码可以出现在任何地方，只要用<?php ?> 包起来的代码，都能够被PHP解析引擎执行，执行后返回普通的HTML内容

本周作业：
1.英雄人物列表API
2.英雄人物详情API
3.写一个PC端的管理页面，可以添加英雄，修改英雄，删除英雄; 统统使用AJAX技术进行，只能够有一个单页面
