<?php
function fetchData($url) {
  // 创建一个新cURL资源
  $ch = curl_init();

  // 设置URL和相应的选项
  curl_setopt($ch, CURLOPT_URL, $url);
  $header = array(
    "Host: yixi.tv",
    "Connection: keep-alive",
    "Cache-Control: max-age=0",
    "Upgrade-Insecure-Requests: 1",
    "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Referer: http://yixi.tv/activities",
    "Accept-Encoding: gzip, deflate, sdch",
    "Accept-Language: zh-CN,zh;q=0.8",
    "Cookie: laravel_session=eyJpdiI6InZGaGYzUHVYekFIZXRBUUVQdlQzQVE9PSIsInZhbHVlIjoiSzJscnZQeFQ1Mnl2MXdVT012bnRlS2p2RkZsRWQrV0ZFVytCcGV3ZEh2aFJpQWJMSm1nckNpVUY5VStLb21pZUFYXC9GZzVDR2hjdGxSRHYrOVNkaGZRPT0iLCJtYWMiOiIwYmM2OGEzNWVkNTU0ZWYyMTBlMWI1NDc2NDExZDVkODNkMWI2NzU3ZTI1ODc4MzI2MTZjNzQ5M2EyYzk5OTFkIn0%3D",
    "SocketLog: SocketLog(tabid=168&client_id=todayisahotday)"
  );
  curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  // 抓取URL并把它传递给浏览器
  $data = curl_exec($ch);

  // 关闭cURL资源，并且释放系统资源
  curl_close($ch);
  return $data;
}
 ?>
