/**
 * Created by 张美 on 2017/6/30.
 */
var goods_id = $.getQueryString('goods_id');
console.log(goods_id);
$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_goods.php?goods_id=' + goods_id,
    'type': 'GET',
    'dataType': 'json',
    'success': function (response) {
        var obj = response.data[0];
        console.log(obj);

        var section = document.getElementById('section');

        var Photo = document.createElement('div');
        Photo.className = "photo";

        var oImg = document.createElement('img');
        oImg.src = obj.goods_thumb;

        var name = document.createElement('p');
        name.className = "name";
        name.innerText = "商品编号：" + obj.cat_id;

        var shop = document.createElement('p');
        shop.className = "shop";
        shop.innerText = obj.goods_name;

        var desc = document.createElement('div');
        desc.className = "desc";
        desc.innerText = obj.goods_desc;

        var describe = document.createElement('div');
        describe.className = "describe";
        var pri = document.createElement('p');
        pri.className = "pri";
        pri.innerText = "价格：    ";
        var price = document.createElement('span');
        price.className = "price";
        price.innerText = "￥" + obj.price;
        var number = document.createElement('p');
        number.className = "number";
        number.innerText = "销售量：" + obj.star_number + "人购买";
        var hot = document.createElement('div');
        hot.className = "hot";
        if (obj.is_hot == 1) {
            hot.innerText = "热门商品";
        }
        var leftBtn = document.createElement('button');
        leftBtn.className = "leftBtn";
        leftBtn.innerText = "加入购物车";

        leftBtn.onclick = function () {
            console.log('onclick');
            if (!localStorage.token) {
                location.href = 'login.html#callbackurl=' + location.href;
                return;
            }
            console.log("已登录");
            var goods_number = localStorage.getItem('cart' + goods_id);
            goods_number = goods_number ? parseInt(goods_number) + 1 : 1;
            updateCartInfo(goods_id, goods_number, function (response) {
                console.log(response);
                location.href = "cart.html";
            });
        }

        var rightBtn = document.createElement('button');
        rightBtn.className = "rightBtn";
        rightBtn.innerText = "立即购买";
        pri.appendChild(price);
        describe.appendChild(pri);
        describe.appendChild(number);
        describe.appendChild(hot);
        describe.appendChild(leftBtn);
        describe.appendChild(rightBtn);

        Photo.appendChild(oImg);
        section.appendChild(Photo);
        section.appendChild(name);
        section.appendChild(shop);
        section.appendChild(desc);
        section.appendChild(describe);
    },
    'error': function (message) {
        console.log(message);
    }
});