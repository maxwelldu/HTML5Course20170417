<?php
require_once('common.php');
$action = $_GET['action'];
$id = isset($_GET['id']) ? $_GET['id'] : 0;
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$apiPrefix = 'http://api.yixi.tv/api/v1/';
$actionUrl = array(
  'album' => $apiPrefix.'album',
  'category' => $apiPrefix.'category/list',
  'homecomment' => $apiPrefix.'lecture/comments/'.$id.'page/index',
  'leccomment' => $apiPrefix.'lecture/comments/'.$id.'/page/'.$page,
  'lecture' => $apiPrefix.'lecture/detail/'.$id,
  'related' => $apiPrefix.'lecture/'.$id.'/related'
);
$html = fetchData($actionUrl[$action]);
echo $html;
?>
