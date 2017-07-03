









$.ajax({
  "url": 'http://lc.shudong.wang/api_goods.php',
  "type": "GET",
  "dataType": "json",
  "success": function(response){
    //处理返回的数据
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
    $('#goods-ul').html($('#goods-ul').html() + '<li><a href="detail.html?goods_id=' + obj.goods_id +'"><img src=' + obj.goods_thumb + '><p>' + obj.goods_name + '</p></a></li>');

    }
  },
  "error": function(message) {
    //
    console.log(message);
  }
});
