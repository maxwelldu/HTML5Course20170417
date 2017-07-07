<meta charset="utf-8">
<?php
  $type_name = $_POST['type_name'];
  $life = $_POST['life'];
  $mp = $_POST['mp'];
  $level = $_POST['level'];
  $attack = $_POST['attack'];
  $title = $_POST['title'];
  $avatar = $_FILES['avatar']['name'];
  move_uploaded_file($_FILES['avatar']['tmp_name'], 'avatar/'.$avatar);
  echo $sql = "INSERT INTO `lol`.`hero`(`id`,`type_name`,`life`,`mp`,`attack`,`title`,`level`,`avatar`) VALUES(NULL,'{$type_name}','{$life}','{$mp}','{$attack}','{$title}','{$level}','{$avatar}');";
  $con = mysqli_connect('localhost', 'root', '', 'lol');

  if (!$con) {
    die('could not connect: ' . mysqli_error($con));
  }

  //更改数据操作编码
  mysqli_query($con, "SET NAMES UTF8");
  //执行SQL语句
  $result = mysqli_query($con, $sql);
 ?>
