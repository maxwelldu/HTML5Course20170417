/**
 * Created by 张美 on 2017/6/30.
 */
// $.ajax({
//     "url": 'http://h6.duchengjiu.top/shop/api_goods.php',
//     "type": "GET",
//     "dataType": "json",
//     "success": function(response){
//         //处理返回的数据
//         console.log(response);
//         for (var i = 0; i < response.data.length; i++) {
//             var obj = response.data[i];
function fetchGoodsDom(obj) {
    var oLi = document.createElement('li');
    var oA = document.createElement('a');
    oA.href = 'detail.html?goods_id=' + obj.goods_id;
    var oImage = document.createElement('img');
    oImage.src = obj.goods_thumb;
    oA.appendChild(oImage);
    var oP = document.createElement('p');
    oP.innerText = obj.goods_name;
    var hot = document.createElement('div');
    hot.className = "hot";
    if (obj.is_hot == 1) {
        hot.innerText = "热门商品";
    }
    var Desc = document.createElement('span');
    Desc.className = "desc";
    Desc.innerText = obj.goods_desc;
    var Price = document.createElement('div');
    Price.className = "price";
    Price.innerText = "￥" + obj.price;
    var Number = document.createElement('div');
    Number.className = "number";
    Number.innerText = "剩余" + obj.goods_number + "件";
    var Form = document.createElement('div');
    Form.className = "form";
    Form.innerText = "包邮";
    oLi.appendChild(Form);
    oLi.appendChild(Number);
    oLi.appendChild(Desc);
    oLi.appendChild(Price);
    oLi.appendChild(hot);
    oLi.appendChild(oP);
    oLi.appendChild(oA);
    return oLi;
}
// goodsUl.appendChild(oLi);
//         }
//     },
//     "error": function(message) {
//         //
//         console.log(message);
//     }
// });
function showShop(page) {
    shop.api.fetchHotGoods(page, 56, function(response){
        //添加分页
        for(var j = 0; j < response.page.page_count; j++){
            $('#ButtonCenter').append($('<span>'+(j+1)+'</span>'));
        }

        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            $('#menu-ul').append($(fetchGoodsDom(obj)));
        }
    });
};

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
