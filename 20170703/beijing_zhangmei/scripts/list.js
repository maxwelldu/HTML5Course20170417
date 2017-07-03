/**
 * Created by 张美 on 2017/6/30.
 */
var cat_id = $.getQueryString('cat_id');
// $.ajax({
//     "url": 'http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id,
//     "type": "GET",
//     "dataType": "json",
//     "success": function(response){
//         //处理返回的数据
//         console.log(response);
//         if (response.data.length === 0) {
//             var oDiv = document.createElement('div');
//             oDiv.className = "demo";
//             oDiv.innerHTML = "<p><span>4</span><span>0</span><span>4</span></p>";
//             document.body.appendChild(oDiv);
//             return;
//         }
        // for (var i = 0; i < response.data.length; i++) {
function fetchGoodsDom(obj) {
    // var obj = response.data[i];
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
    // goodsUl.appendChild(oLi);
    return oLi;
}
//         }
//     },
//     "error": function(message) {
//         //
//         console.log(message);
//     }
// });



function showShop(page) {
    shop.api.fetchGoodsListByCatId(cat_id, page, 24, function(response){
        console.log(response);
        //如果返回的商品为空，则给出空的提示
        // if (response.data.length === 0) {
        //     var oH1 = document.createElement('h1');
        //     oH1.innerText = "当前分类下面没有商品";
        //     document.body.appendChild(oH1);
        //     return;
        // }
        if (response.data.length === 0) {
            var oDiv = document.createElement('div');
            oDiv.className = "demo";
            oDiv.innerHTML = "<p><span>4</span><span>0</span><span>4</span></p>";
            document.body.appendChild(oDiv);
            return;
        }
        for(var j = 0; j < response.page.page_count; j++){
            $('#ButtonCenter').append($('<span>'+(j+1)+'</span>'));
        }
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            $('#menu-ul').append($(fetchGoodsDom(obj)));
        }
    });
}

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
