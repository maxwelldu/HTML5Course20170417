<?php
$m = $_FILES['image'];
var_dump($m);
$count = count($m['name']);
for($i = 0; $i < $count; $i++) {
  move_uploaded_file($m['tmp_name'][$i], 
  'upload/' . $m['name'][$i]);
}
 ?>
