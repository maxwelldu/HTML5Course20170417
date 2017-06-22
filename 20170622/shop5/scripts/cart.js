/**
 * Created by maxwell on 17/3/22.
 */
(function () {
  //购物车模板
  var sCartTemplate = '';
  var oShoppingCartList = document.getElementById("shoppingcarList");

  /**
   * 处理购物车
   */
  var doCart = function(err,d) {
    try {
      var dataJSON = JSON.parse(d);
      $.each(dataJSON.data, function (item) {
        var sLi = $.compile(sCartTemplate, item);
        oShoppingCartList.innerHTML += sLi;
      });
    } catch(e) {
      console.log(e.errors);
    }
  };
  /**
   * 获取购物车数据
   */
  var getCart = function(){
    $.loadTemplate('./template/cart_item.html', function(err, data){
      if (err) {
        console.log(err);
        return;
      }
      sCartTemplate = data;

      $.get(
        ucshop.getCartAddress(),
        {},
        doCart,
        {'token':ucshop.getLoginedToken()}
      )
    });
  };

  window.onload = function() {
    ucshop.checkLoginStatus();
    //获取购物车
    getCart();
  }
})();