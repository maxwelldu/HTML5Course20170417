shop.api.fetchHotGoods(function(response){
    var obj = response.data;
    for (var j = 0; j < obj.length; j++) {
            $(".goods-cont").append('<div class="goodsImg"><a class="hrefImg" href="detail.html?goods_id=' +obj[j].goods_id+ '">' +
                '<img src="' + obj[j].goods_thumb + '"><p class="goodsName">'
                + obj[j].goods_name+'</p></a></div>');
        }
})