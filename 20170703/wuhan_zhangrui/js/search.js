var searchText = $.getQueryString('search_text');
console.log(searchText);
var oSearchText = document.getElementById('search-text');
oSearchText.value = searchText;

searchGoods();
function searchGoods() {
	 shop.api.searchGoods({
	    "search_text": searchText,
	    "page": 1,
	    "pagesize": 10,
	    "callback": function(response) {
		 console.log(response);
	      var html = "";
	      for (var i = 0; i < response.data.length; i++) {
	        var obj = response.data[i];
	      $("#container").html($("#container").html()+'<div><a href="detail.html?goods_id='
	          + obj.goods_id
	          + '"><img src="'
	          + obj.goods_thumb
	          + '" /><p>'
	          + obj.goods_name
	          + '</p></a></div>');
	      }
	    }
	});
}