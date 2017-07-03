/**
 * Created by 张美 on 2017/6/30.
 */
// var searchText = $.getQueryString('search_text');
// console.log(searchText);

var searchText = $.getQueryString('search_text');
console.log(searchText);
var oSearchText = document.getElementById('search-text');
oSearchText.value = searchText;

var page = 1;
$('#ButtonPrev').click(function () {
    page --;
    if(page <= 1) page = 1;
    $('#menu-ul').html('');
    showShop(page);
});
$('#ButtonNext').click(function () {
    page ++;
    $('#menu-ul').html('');
    showShop(page);
});
$('#ButtonCenter').click(function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName === "SPAN"){
        page = target.innerText;
        $('#menu-ul').html('');
        ButtonCenter.innerHTML = null;
        ButtonCenter.style.marginLeft = -page * 52 + "px";
    }
    showShop(page)
});
showShop(page);
//调用搜索商品接口
function showShop (page){
    shop.api.searchGoods({
        "search_text": searchText,
        "page": page,
        "pagesize": 20,
        "callback": function(response) {
            console.log(response);
            var html = "";
            for(var j = 0; j < response.page.page_count; j++){
                $('#ButtonCenter').append($('<span>'+(j+1)+'</span>'));
            }
            for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                $('#menu-ul').append($(fetchGoodsDom(obj)));
            }
        }
    });
}
































































































































































































































// searchGoods();
// function searchGoods () {
//     // var grabble = document.getElementById('grabble');
//     $.ajax ({
//         'url': 'http://lc.shudong.wang/api_goods.php?search_text=' + searchText,
//         'type': 'GET',
//         'dataType': 'json',
//         'success': function (response) {
//             console.log(response);
//             for (var i = 0; i < response.data.length; i++) {
//                 var obj = response.data[i];
//
//                 var section = document.getElementById('section');
//
//                 var Photo = document.createElement('div');
//                 Photo.className = "photo";
//
//                 var OA = document.createElement('a');
//                 OA.href = 'detail.html?goods_id=' + obj.goods_id;
//                 var oImg = document.createElement('img');
//                 oImg.src = obj.goods_thumb;
//
//                 var name = document.createElement('p');
//                 name.className = "name";
//                 name.innerText = "商品编号：" + obj.cat_id;
//
//                 var shop = document.createElement('p');
//                 shop.className = "shop";
//                 shop.innerText = obj.goods_name;
//
//                 var desc = document.createElement('div');
//                 desc.className = "desc";
//                 desc.innerText = obj.goods_desc;
//
//                 var describe = document.createElement('div');
//                 describe.className = "describe";
//                 var pri = document.createElement('p');
//                 pri.className = "pri";
//                 pri.innerText = "价格：    ";
//                 var price = document.createElement('span');
//                 price.className = "price";
//                 price.innerText = "￥" + obj.price;
//                 var number = document.createElement('p');
//                 number.className = "number";
//                 number.innerText = "销售量：" + obj.star_number + "人购买";
//                 var hot = document.createElement('div');
//                 hot.className = "hot";
//                 if (obj.is_hot == 1) {
//                     hot.innerText = "热门商品";
//                 }
//                 var leftBtn = document.createElement('button');
//                 leftBtn.className = "leftBtn";
//                 leftBtn.innerText = "加入购物车";
//
//                 leftBtn.onclick = function(){
//                     //验证用户是否登录，未登录则跳到登录页
//                     console.log('onclick');
//                     if (!localStorage.token) {
//                         // location.assign( 'login.html#callbackurl='+location.href);
//                         location.href = 'login.html#callbackurl='+location.href;
//                         return;
//                     }
//                     console.log('已登录');
//                     //获取当前商品已经购买的数量
//                     var goods_number = localStorage.getItem('cart'+obj.goods_id);
//                     goods_number = goods_number ? parseInt(goods_number)+1 : 1;//如果已经有了则加1，没有则是第一次购买
//                     updateCartInfo(obj.goods_id, goods_number, function(response){
//                         location.href = 'cart.html';
//                     });
//                 }
//
//                 var rightBtn = document.createElement('button');
//                 rightBtn.className = "rightBtn";
//                 rightBtn.innerText = "立即购买";
//                 pri.appendChild(price);
//                 describe.appendChild(pri);
//                 describe.appendChild(number);
//                 describe.appendChild(hot);
//                 describe.appendChild(leftBtn);
//                 describe.appendChild(rightBtn);
//
//                 OA.appendChild(oImg);
//                 Photo.appendChild(OA);
//                 section.appendChild(Photo);
//                 section.appendChild(name);
//                 section.appendChild(shop);
//                 section.appendChild(desc);
//                 section.appendChild(describe);
//             }
//         }
//     });
// }