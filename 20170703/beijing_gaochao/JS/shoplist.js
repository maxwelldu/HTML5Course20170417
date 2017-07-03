var goods_id = al.getQueryString('goods_id');
// console.log(goods_id);

$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_goods.php?goods_id=' + goods_id,
   'type': 'GET',
    'dataType': 'json',
    'success': function (response) {
        var obj = response.data[0];
        console.log(obj);
        var shopList = $('#shopList');
        var oImg = $('<img src="' + obj.goods_thumb +  '"/>');
        // oImg.src = obj.goods_thumb;
        shopList.append(oImg);
        var shopListRight = $('#shopListRight');
        var oh1 = $('#oh1').text(obj.goods_name);
        // oh1.innerText = obj.goods_name;
        var slroPrice = $('#slroPrice').text("￥"+obj.price);
        // slroPrice.innerText = obj.price;
        var num = 1;
        $('#rightButton').click(function () {
            // var num = $('#centerText').val();
            num++;
            $('#centerText').val(num);
            // obj.price=obj.price;
            var Price = num * obj.price;
            slroPrice = $('#slroPrice').text("￥" + Price+".00");
        });
        $('#leftButton').click(function () {
            num--;
            if(num < 1) num = 1;
            $('#centerText').val(num);
            var Prices = num * obj.price;
            slroPrice = $('#slroPrice').text("￥" + Prices);
        });
        var Cart = document.getElementById('Cart');
        Cart.onclick = function () {
            //验证用户是否登录
            if(!localStorage.token) {
                location.assign('login.html#callbackurl='+location.href);
            }
            console.log('已登录');
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                "type": "POST",
                "data": {
                    "goods_id": goods_id,
                    "number":function () {
                        return num;
                    }
                },
                "dataType": "json",
                "success": function (response) {
                    console.log(response);
                    location.assign('http://localhost:63342/%E7%AC%AC%E4%BA%8C%E5%A4%A9/cart.html?_ijt=a0ko8q6p1pjs9u7ljb0n30fo7')
                }
            })
        }
    }
});
Onelist();
