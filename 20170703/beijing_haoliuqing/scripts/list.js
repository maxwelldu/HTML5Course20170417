//商品信息
var cat_id = $.getQueryString('cat_id');
// console.log(cat_id);
// $.ajax({
//     "url": "http://lc.shudong.wang/api_goods.php?cat_id=" + cat_id,
//     "type": "GET",
//     "dataType": "json",
//     "success": function(response){
//         //处理返回的数据
//         var obj = response.data;
//         if (obj.length === 0) {
//             $(".goods").append('<h1 style="width: 100%;text-align: center;line-height: 400px">'+'当前分类下面没有商品'+'</h1>');
//             return;
//         }
//         for (var j = 0; j < obj.length; j++) {
//             $(".goods-cont").append('<div class="goodsImg"><a class="hrefImg" href="detail.html?goods_id=' +obj[j].goods_id+ '">' +
//                 '<img src="' + obj[j].goods_thumb + '"><p class="goodsName">'
//                 + obj[j].goods_name+'</p></a></div>');
//         }
//         console.log(response);
//     },
//     "error": function(message) {
//         //
//         console.log(message);
//     }
// });
shop.api.fetchGoodsListByCatId(cat_id, function(response){
    var obj = response.data;
        if (obj.length === 0) {
            $(".goods").append('<h1 style="width: 100%;text-align: center;line-height: 400px">'+'当前分类下面没有商品'+'</h1>');
            return;
        }
        for (var j = 0; j < obj.length; j++) {
            $(".goods-cont").append('<div class="goodsImg"><a class="hrefImg" href="detail.html?goods_id=' +obj[j].goods_id+ '">' +
                '<img src="' + obj[j].goods_thumb + '"><p class="goodsName">'
                + obj[j].goods_name+'</p></a></div>');
        }
});