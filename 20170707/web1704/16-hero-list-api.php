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
    $array = array();
    while( $row = mysqli_fetch_array($result)) {
      $array[] = $row;
    }
    echo json_encode($array);
   ?>
