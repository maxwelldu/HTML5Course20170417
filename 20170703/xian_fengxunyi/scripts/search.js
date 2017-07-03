var searchText = $.getQueryString("search_text");
console.log(searchText);
var oSearchText = $("#search_text");
oSearchText.value = searchText;

searchGoods();
//调用搜索商品接口
function searchGoods() {
    $.ajax({
        "url": "http://lc.shudong.wang/api_goods.php?search text=" +searchText,
        "type":"GET",
        "dataType":"json",
        "success":function (response) {
            console.log(response);
            var html = "";
            for(var i =0;i < response.data.length;i++){
                var obj = response.data[i];
                html += '<div class="detailOli"><a href="detail.html?goods_id='
                    + obj.goods_id
                    + '"><img class="oImage" src="'
                    + obj.goods_thumb
                    + '" /><p>'
                    + obj.goods_name + '  ' + obj.price + '元'
                    + '</p></a></div>';
            }
            //document.getElementById("container").innerHTML = html;
            $("#container").html(html);
        }
    })
}
