<?php
	header("Content-Type:text/json;charset=gb2312");
	$shoujihao = $_GET["shoujihao"];
	$a = file_get_contents("http://chongzhi.jd.com/json/order/search_searchPhone.action?mobile=".$shoujihao);
	print_r($a);
?>