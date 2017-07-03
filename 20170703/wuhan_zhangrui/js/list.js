
var cat_id = $.getQueryString('cat_id');
console.log(cat_id)
// var arr = "当前分类下面没有商品"
	shop.api.fetchGoodsListByCatId(cat_id,function(response) {
		console.log(response);
		if(response.data.length === 0) {
			$('#goods-ul').html("<h1>当前分类下面没有商品<h1>")
				return;

		}
		for(var i = 0; i < response.data.length; i++) {
			var obj = response.data[i];
			$('#goods-ul').append('<li><a href="detail.html?goods_id=' + obj.goods_id +'"><img src=' + obj.goods_thumb + '><p>' + obj.goods_name + '</p><span>' +"￥"+ obj.price + '</span></a></li>');
		}
	})
