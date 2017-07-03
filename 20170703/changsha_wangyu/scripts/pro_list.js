var cat_id = $.getQueryString('cat_id');
$(function() {
	shop.api.fetchGoodsListByCatId(cat_id, function(response) {
	  console.log(response);  
	  if (response.data.length === 0) {
	  	$(".main-list").append('<li class="hint">当前分类下面没有商品~ ~ ！^_^  全是API的错</li>')
	    return;
	  }
	  for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
	   $(".main-list").append('<li><div calss="like"></div><a href="pro_center.html?goods_id='
	        + obj.goods_id 
	        + '"><img src="' 
	        + obj.goods_thumb
	        +'"/><div class="content"><span>￥'+ obj.price +'</span><h4>' 
	        + obj.goods_name 
	        + '</h4><p>'
	        + obj.goods_desc 
	        +'</p></div></a><h3><img class="min-img" src="'+ obj.goods_thumb +'"/><p>无法获取数据</p></h3></li> ')
	  }
	}); 
})
