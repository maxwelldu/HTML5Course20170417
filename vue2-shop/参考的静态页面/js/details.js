$(function () {
    var goods_id = $.getQueryString("goods_id");
    console.log(goods_id);
    $.ajax({
        "url": 'http://h6.duchengjiu.top/shop/api_goods.php?goods_id=' + goods_id,
        "type": "GET",
        "dataType": "json",
        "success": function (response) {
            console.log(response);
            var obj = response.data[0];
            var goods = $("#goodsDetails");
            goods.append("<div id='ImgContainer'><img src='"
                + obj.goods_thumb + "'><div class='detailsShade' id='deailsShade'></div><div class='detailBigImg' id='deailBigImg'><img src='"
                + obj.goods_thumb + "'></div></div><h1>"
                + obj.goods_name +"</h1><b>￥"+ obj.price
                +" </b><p>" + obj.goods_desc
                + "</p><div id='goodsNumber' class='goodsNumber'><button class='numLeft' id='numLeft'>-</button><input type='tel' class='goodsNmu' id='goodsNmu' min='1' max='10' value='1'><button class='numRight' id='numRight'>+</button></div><br><a href='#'>立即购买</a><a id='purchase'>加入购物车</a>")
            var numLeft = $("#numLeft");
            var goodsNmu = $("#goodsNmu");
            var numRight = $("#numRight");
            goodsNmu.blur(function () {
                var goodsNmuVal = goodsNmu.val();
                if(/[\d]+/.test(goodsNmuVal)){
                    if(goodsNmuVal < 1){
                        console.log(132);
                        goodsNmu.val("1");
                    }else if(goodsNmuVal > 10){
                        goodsNmu.val("10");
                    }
                }else{
                    goodsNmu.val("1");
                }
            });
            numLeft.click(function () {
                // sum--;
                // sum = sum < 1 ? 1 : sum;
                if(goodsNmu.val() == 1){
                    return;
                }
                goodsNmu.val(parseInt(goodsNmu.val())-1);
            });
            numRight.click(function () {
                // sum++;
                // sum = sum > 10 ? 10 : sum;
                if(goodsNmu.val() == 10){
                    return;
                }
                goodsNmu.val(parseInt(goodsNmu.val())+1);
            });
            var number = 0;

            $("#purchase").click(function () {
                number += parseInt(goodsNmu.val());
                if(number > 10) number = 10;
                if(number < 1) number = 1;
                if(localStorage.getItem("token") == null){
                    Login();
                }else{
                    console.log(number);
                    if(localStorage.getItem(goods_id+"_num",number) == 10 && localStorage.getItem("cart_id"+goods_id,goods_id)){
                        alert("达到上限");
                        return;
                    }
                    localStorage.setItem(goods_id+"_num",number);
                    localStorage.setItem("cart_id"+goods_id,goods_id);
                    $.ajax({
                        "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                        "type":"post",
                        "dataType":"json",
                        "data":{
                            "goods_id": goods_id,
                            "number": localStorage.getItem(goods_id+"_num")
                        },
                        "success":function (response) {
                            console.log(response);
                            if(response.code == 0){
                                alert(response.message)
                            }else if(response.code == 2){
                                alert("只能购买10个");
                            }
                        }
                    })
                }
            });

        }
    });

});
