<?php
$id = $_GET['id'];
$sql = "DELETE FROM `lol`.`hero` WHERE `hero`.`id` = {$id}";
$con = mysqli_connect('localhost', 'root', '', 'lol');

if (!$con) {
  die('could not connect: ' . mysqli_error($con));
}

//更改数据操作编码
mysqli_query($con, "SET NAMES UTF8");
//执行SQL语句
$result = mysqli_query($con, $sql);
 ?>
