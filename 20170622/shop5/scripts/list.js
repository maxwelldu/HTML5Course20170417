/**
 * Created by maxwell on 17/3/22.
 */
(function () {
  //商品模板
  var sGoodsTemplate = '';
  var oGoodsUl = document.getElementById("goods_ul");
  var oGoodsCategory = document.getElementById("goods_category");

  /**
   * 处理商品
   */
  var doGoods = function(err,d) {
    try {
      var dataJSON = JSON.parse(d);
      $.each(dataJSON.data, function (item) {
        var sLi = $.compile(sHotGoodsTemplate, item);
        oGoodsUl.innerHTML += sLi;
      });
    } catch(e) {
      console.log(e.errors);
    }
  };
  /**
   * 获取商品
   */
  var getGoods = function(){
    var cat_id = $.getQueryString("cat_id");
    $.loadTemplate('./template/list_goods.html', function(err, data){
      if (err) {
        console.log(err);
        return;
      }
      sHotGoodsTemplate = data;

      $.get(
        ucshop.getGoodsAddress(),
        {"cat_id": cat_id, "page":1, "pagesize":10},
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
  }
})();