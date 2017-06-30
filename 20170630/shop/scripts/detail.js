//得到商品ID
var goods_id = $.getQueryString('goods_id');
console.log(goods_id);

shop.api.fetchGoodsDetail(goods_id, function(response){
    var obj = response.data[0];
    console.log(obj);
    $('#goods_img').attr('src', obj.goods_thumb);
    $('#goods_name').text(obj.goods_name);
    $('#goods_price').text(obj.price);
    $('#goods_desc').text(obj.goods_desc);
    $('#add-to-cart').click(function(){
      //验证用户是否登录，未登录则跳到登录页
      if (!localStorage.token) {
        // location.assign( 'login.html#callbackurl='+location.href);
        location.href = 'login.html#callbackurl='+location.href;
        return;
      }
      console.log('已登录');
      //获取当前商品已经购买的数量
      var goods_number = localStorage.getItem('cart'+goods_id);
      goods_number = goods_number ? parseInt(goods_number)+1 : 1;//如果已经有了则加1，没有则是第一次购买
      shop.api.updateCart(goods_id, goods_number, function(response) {
        //加入购物车了之后把商品ID和对应的数量存储到本地
        shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
        location.href = '/cart.html';
      });
    });
});
