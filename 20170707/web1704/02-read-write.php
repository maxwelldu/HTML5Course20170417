<?php
  $html = <<<HAIQUERY
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  首页内容
</body>
</html>
HAIQUERY;

echo $html;
file_put_contents('index.html', $html);

echo '<br />以下内容是从index.html文件当中读取的<br />';
echo file_get_contents('index.html');
?>
