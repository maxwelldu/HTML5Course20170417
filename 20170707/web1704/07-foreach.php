<meta charset="utf-8">
<?php
  $classes = array('北京','武汉','西安',' 长沙');
  for ($i = 0; $i < count($classes); $i++) {
    echo $classes[$i] . "<br />";
  }
  echo '<hr />';
  foreach ($classes as $v) {//$v相当于形参
    echo $v . '<br />';
  }
  foreach ($classes as $k => $v) {
    echo $k . ' => ' . $v . '<br />';
  }

  $arr1 = array(1,2);
  $arr2 = array(3,4);
  $arr3 = array_combine($arr1, $arr2);
  var_dump($arr3);
  var_dump(array_merge($arr1, $arr2));

  $arr = array(1,2,3,3,2,1);
  var_dump(array_unique($arr));

  //差集,想到两个朋友之间非共同好友
  $changkun = array(
    '子浩',
    '高超',
    '晓磊'
  );
  $haixia = array(
    '高超',
    '子浩',
    '张美'
  );
  var_dump(array_diff($changkun, $haixia));//是常坤的好友，但是不是海霞的好友
  var_dump(array_diff($haixia, $changkun));
  var_dump(array_intersect($haixia, $changkun));

  $arr = array(1,2,3,4);
  array_push($arr, 5);
  var_dump($arr);
  array_pop($arr);
  var_dump($arr);
  array_unshift($arr, 0);
  var_dump($arr);
  array_shift($arr);
  var_dump($arr);


 ?>
