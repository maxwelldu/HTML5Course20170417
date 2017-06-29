//获取参数search_text, 然后将内容放到搜索框
var searchText = $.getQueryString('search_text');
console.log(searchText);
var oSearchText = document.getElementById('search-text');
oSearchText.value = searchText;

searchGoods();
//调用搜索商品接口
function searchGoods (){
  shop.api.searchGoods({
    "search_text": searchText,
    "page": 1,
    "pagesize": 10,
    "callback": function(response) {
      console.log(response);
      var html = "";
      for (var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        html += '<div><a href="detail.html?goods_id='
          + obj.goods_id
          + '"><img src="'
          + obj.goods_thumb
          + '" /><p>'
          + obj.goods_name
          + '</p></a></div>';
      }
      document.getElementById('container').innerHTML = html;
    }
  });
}
