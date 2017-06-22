/**
 * Created by maxwell on 17/3/22.
 */
(function () {
  //商品模板
  var sGoodsTemplate = '';
  var oGoods = document.getElementById("goods");
  var oGoodsCategory = document.getElementById("goods_category");

  /**
   * 更新购物车
   * @param data, 包含商品编号和商品数量
   */
  var updateCart = function(data){
    $.post(
      ucshop.getCartAddress(),
      data,
      function(err,data){
        var time=new Date()
        console.log(data+"__"+time.getTime());
        try {
          var dataJson = JSON.parse(data);
          if (dataJson.code == ucshop.CODE.succ) {
            console.log('添加购物车成功');
          } else if (dataJson.code == ucshop.CODE.tokenerr){
            console.log('TOKEN非法');
          } else {
            console.log('系统错误');
          }
        } catch(e) {
          console.log(e.errors);
        }
      },
      {'token': ucshop.getUserToken()}
    );
  };

  /**
   * 处理商品
   */
  var doGoods = function(err,d) {
    console.log(d);
    try {
      var dataJSON = JSON.parse(d);
      var sDiv = $.compile(sGoodsTemplate, dataJSON.data[0]);
      oGoods.innerHTML = sDiv;

      var oCartBtn = oGoods.getElementsByClassName('addToCart')[0];
      oCartBtn.addEventListener('click', function(){
        ucshop.checkLogin(function(){}, function(){
          //未登录
          console.log('未登录');
          window.open('login.html', '_top', 'height:300;width:500;scrollbars=no,location=no');
        });
        updateCart({goods_id: oCartBtn.getAttribute('data-goodsid'), number:1});
      });
    } catch (e) {
      console.error('err');
      console.log(e.errors);
    }
  };
  /**
   * 获取商品
   */
  var getGoods = function(){
    var goods_id = $.getQueryString("goods_id");
    $.loadTemplate('./template/detail_goods_info.html', function(err, data){
      if (err) {
        console.log(err);
        return;
      }
      sGoodsTemplate = data;

      $.get(
        ucshop.getGoodsAddress(),
        {"goods_id": goods_id},
        doGoods
      )
    });
  };

  /**
   * 处理商品分类数据
   */
  var doGoodsCategory = function(data){
    $.each(data.data, function(item){
      var oLi = document.createElement("li");
      var oA = document.createElement("a");
      oA.href = "list.html?cat_id=" + item.cat_id;
      oA.innerText = item.cat_name;
      oLi.appendChild(oA);
      oGoodsCategory.appendChild(oLi);
    })
  };
  /**
   * 获取商品分类信息
   */
  var getGoodsCategory = function(){
    $.jsonp(
      ucshop.getGoodsCategoryAddress(),
      {"format":"jsonp", "callback":"doGoodsCategory"},
      "doGoodsCategory",
      doGoodsCategory
    );
  };

  window.onload = function() {
    ucshop.checkLoginStatus();
    //获取商品分类信息
    getGoodsCategory();
    //获取商品
    getGoods();
    //给加入购物车绑定事件
    // bindEvent();
  }
})();