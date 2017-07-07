<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      //1.输出
      echo 1;
      echo "1";
      echo true;
      echo '<br />';
      //2.变量
      $name = "max";
      $age = 1;
      echo '<br />';
      //3.连字符
      echo 1 + 2;//3
      echo 1 . '2';//12
      echo '<br />';
      //4.数据类型
      $age = 1;
      $weight = 120.5;
      $name = 'max';//里面的变量是不能解析的
      $name = "$name";//变量能够解析
      $name = "a{$name}a";//相当于JS中的``
      $arr = array('1',2,3);
      $arr = [1,2,3,4];//PHP5.4以上可用
      echo '<br />';
      //5.变量的作用域
      function showName() {
        //在函数里面不能直接访问外部的变量
        //需要添加global关键字
        //或者使用超全局数组$GLOBALS[] //相当于JS中的window对象,当中存放了所有的全局变量
        // global $name;
        // echo $name;
        $name = "changkun";
        echo $GLOBALS['name'];
      }
      showName();
      echo '<br />';
      //6.运算符
      //+ - * / % ++ -- > < == === && || !
      //7.数组
      $arr = array(1,2,3);//0 => 1, 1 => 2, 2 => 3
      $arr = array(//=> 相当于JS对象中的冒号,k=>v
        'name' => 'max',
        'age' => 18
      );
      //7.1索引数组
      $arr = array('a','b');
      //相当于
      $arr = array(
        0 => 'a',
        1 => 'b'
      );
      //7.2关联数组
      $arr = array(
        'name' => 'max',
        'age' => 10
      );
      //8.header()
      // header("Location: http://www.baidu.com");//自定义http response header内容
      //9.超全局数组
      /*
      $GLOBALS — 引用全局作用域中可用的全部变量
      $_SERVER — 服务器和执行环境信息
      $_GET — HTTP GET 变量
      $_POST — HTTP POST 变量
      $_FILES — HTTP 文件上传变量
      $_REQUEST — HTTP Request 变量
      $_SESSION — Session 变量
      $_ENV — 环境变量
      $_COOKIE — HTTP Cookies
      */
      var_dump($GLOBALS);
      //10.curl 用来抓取网站数据，可以详细定制各种HTTP相关的内容，也可以用来模拟表单提交
      //11.file_put_content 把文件内容写入到指定文件中
      //12.file_get_contents 从指定文件中读取内容
     ?>
  </body>
</html>
