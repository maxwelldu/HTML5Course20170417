var goods_id = $.getQueryString('goods_id');
	shop.api.fetchGoodsDetail(goods_id, function(response) {
		var obj = response.data[0];
		var diyClassName = "details";
	 	var searchBtn = "search-btn"
		$("body").append('<div class="'+diyClassName+'"><img src='+ obj.goods_thumb +'/><p>'+ obj.goods_desc+'</p><button class="search-btns">加入购物车</button></div>');
		var searchBtn = $('.search-btns');
		searchBtn.click(function() {
				if(localStorage.getItem('username') == null) {
					 location.href = 'login.html';
					return;
				 }
				
				 var goods_number = localStorage.getItem('cart'+goods_id);
				 goods_number = goods_number ? parseInt(goods_number)+1 : 1;
				 updateCartInfo(goods_id, goods_number, function(response) {
				 	if(response.code === 0) {
				 		alert('添加成功')
				 	}
				 	if(response.code === 2) {
				 		alert('购物车已存在');
				 	}
				 })
			
			});
		})