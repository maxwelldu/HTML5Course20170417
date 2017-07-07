<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
      .hero {
        width: 300px;
        height: 500px;
        border: 1px solid gray;
        float: left;
        border-radius: 50px;
      }
    </style>
  </head>
  <body>
    <?php
      //创建一个数据库连接，连接哪个数据库服务器，用户名，密码，数据库名
      //$con 就是一个变量，表示一次连接
      $con = mysqli_connect('localhost', 'root', '', 'lol');
      if (!$con) {
        die('could not connect: ' . mysqli_error($con));
      }

      //更改数据操作编码
      mysqli_query($con, "SET NAMES UTF8");
      //执行SQL语句
      $result = mysqli_query($con, "SELECT * FROM hero");
      //循环读取所有内容
      while( $row = mysqli_fetch_array($result)) {
        // var_dump($row);
        echo '<div class="hero">';
        echo '英雄名称：' . $row['type_name'] ;
        echo '英雄生命：' . $row['life'] ;
        echo '英雄蓝：' . $row['mp'] ;
        echo '英雄攻击：' . $row['attack'] ;
        echo '英雄称号：' . $row['title'] ;
        echo '英雄等级：' . $row['level'] ;
        echo '英雄头像：<img width="200" src="avatar/' . $row['avatar'] . '">';
        echo "<span class='delete' onclick='deleteHero({$row['id']})'>删除</span>";
        echo '</div>';
      }
     ?>
     <script type="text/javascript">
     function deleteHero(id) {
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange = function(){
         if (xhr.readyState === 4) {
           location.reload();
         }
       }
       xhr.open('GET', '15-hero-delete.php?id='+id, true);
       xhr.send();
     }
     </script>
  </body>
</html>
