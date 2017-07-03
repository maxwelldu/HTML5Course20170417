//获取参数search_text, 然后将内容放到搜索框
var searchText = $.getQueryString('search_text');
console.log(searchText);
var oSearchText = document.getElementById('search-text');
oSearchText.value = searchText;

searchGoods();
//调用搜索商品接口
function searchGoods (){
    $.ajax({
        "url": 'http://h6.duchengjiu.top/shop/api_goods.php?search_text=' + searchText,
        'type': 'GET',
        'dataType': 'json',
        'success': function(response) {
            console.log(response);
            var html = "";
            for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                html += '<div><a href="detail.html?goods_id='
                    + obj.goods_id
                    + '"><img src="'
                    + obj.goods_thumb
                    + '" /><h1>'
                    +obj.goods_name
                    + '</h1><h2>售价：￥'
                    +obj.price
                    +'</h2><p>'
                    + obj.goods_desc
                    + '</p>'
                    +'<span>'
                    +'查看详情'
                    +'</span></a></div>';
            }
            document.getElementById('container').innerHTML = html;
        }
    });
}
