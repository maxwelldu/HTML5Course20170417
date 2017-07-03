//得到商品ID
var goods_id = $.getQueryString('goods_id');
console.log(goods_id);

$.ajax({
  'url': 'http://lc.shudong.wang/api_goods.php?goods_id='+goods_id,
  'type': 'GET',
  'dataType': 'json',
  'success': function(response) {
    var obj = response.data[0];
    console.log(obj);

  
    var oImg = document.createElement('img');
    oImg.style.borderRadius="15%";
    oImg.style.border="2px solid orangered";
    oImg.style.marginTop="20px";
    oImg.style.width="350px";
    oImg.style.height="350px";
    oImg.style.float="left"
    oImg.style.marginLeft="-378px";
    oImg.src = obj.goods_thumb;
    odiv1.appendChild(oImg);
     
    
// 
    zi.innerText = "商品简介："+obj.goods_desc;
    var ospan =document.createElement("span")
    ospan.innerText = '商品价格：'+obj.price+"元";
   
    odiv1.appendChild(ospan);
   
  
    oBtn.onclick = function(){
      //验证用户是否登录，未登录则跳到登录页
      if (!localStorage.token) {
        // location.assign( 'login.html#callbackurl='+location.href);
        location.href = 'logit.html#callbackurl='+location.href;
        return;
      }else{
      	alert("添加购物车成功")
      }
      console.log('已登录');
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
    }
   
    
  }

})


