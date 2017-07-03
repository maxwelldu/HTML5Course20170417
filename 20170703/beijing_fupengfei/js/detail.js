var goods_id = $.getQueryString('goods_id');
var intro = document.getElementById('intro');
console.log(goods_id);
$.ajax({
    "url": 'http://h6.duchengjiu.top/shop/api_goods.php?goods_id='+goods_id,
    'type' : 'GET',
    'dataType':'json',
    'success' : function (response) {
        var obj = response.data[0];
        console.log(obj);
        var oImg = document.createElement('img');
        oImg.src = obj.goods_thumb;
        intro.appendChild(oImg);

        var oDiv = document.createElement('div');
        intro.appendChild(oDiv);

        var name = document.createElement('h2');
        name.innerText = obj.goods_name;
        oDiv.appendChild(name);

        var many = document.createElement('h3');
        many.innerText = '特价：' + obj.price;
        oDiv.appendChild(many);

        var oP = document.createElement('p');
        oP.innerText = "简介：" + obj.goods_desc;
        oDiv.appendChild(oP);

        var go = document.createElement('span');
        go.className = 'goshop'
        go.innerText = '立即购买';
        oDiv.appendChild(go);

        var shop =document.createElement('span');
        shop.className = 'shop';
        shop.innerText = '加入购物车';
        oDiv.appendChild(shop);

        shop.onclick = function () {
            if(!localStorage.token){
                location.href = 'login.html#callbackurl='+localStorage.href;
                return;
            }
            console.log('已登录');
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                "type": "POST",
                "data": {
                    "goods_id": goods_id,
                    "number": 1
                },
                "dataType": "json",
                "success": function(response) {
                    console.log(response);
                    alert('成功加入购物车，快去看看')
                }
            });
        }
    }
})