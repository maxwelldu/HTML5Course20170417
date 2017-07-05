<?php
	header("Content-Type:text/json;charset=gb2312");
 
	$a = file_get_contents("http://huaban.com/explore/banmiansheji/?inzqaws6&max=521858061&limit=20&wfl=1");
	print_r($a);
?>