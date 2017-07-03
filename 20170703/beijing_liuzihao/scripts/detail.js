/**
 * Created by Administrator on 2017/6/23 0023.
 */
var shopDetail = document.getElementById('shopdetail');
var goods_id = $.getQueryString("goods_id");
console.log(goods_id)
$.ajax({
  "url": 'http://h6.duchengjiu.top/shop/api_goods.php?goods_id='+ goods_id,
  "type": "GET",
  "dataType": "json",
  "success": function(response){
    console.log(response);
    //处理返回的数据
    var detailTemplateStr = document.getElementById("detail").innerHTML;
    for (var i = 0; i < response.data.length; i++) {
     var obj = response.data[i];
     obj.class1 = "detailshop";
     obj.class2 = "detailname";
     obj.class3 = "detaildesc";
     obj.class4 = "detailimg";
     obj.class5 = "card";
     obj.src1 = obj.goods_thumb;
     shopDetail.innerHTML += $.compile(detailTemplateStr,obj);
    }
      var card = document.getElementById("card");
      card.onclick = function () {
          if (!localStorage.token){
              location.assign("loding.html#cardbackurl="+location.href);
              return;
              }
          $.ajax({
              "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
              "type": "POST",
              "data": {
                  "goods_id": goods_id,
                  "number": 1
              },
              "dataType": "json",
              "success": function(response) {
                  console.log(response);
              }
          });
      };
  },
  "error": function(message) {
    //
    console.log(message);
  }
});

