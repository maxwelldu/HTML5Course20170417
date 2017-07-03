var goods_id = $.getQueryString('goods_id');
$.ajax({
    'url': 'http://lc.shudong.wang/api_goods.php?goods_id='+goods_id,
    'type': 'GET',
    'dataType': 'json',
    'success': function (response) {
        console.log(response);
        for(var i=0;i<response.data.length;i++){

            var obj = response.data[i];
            console.log(obj);
            $('#detailul').append('<li class="detailOli"><img class="oImage" src="'+ obj.goods_thumb +'" alt=""></br><p>'+obj.goods_desc + '</p></br><p class="totle">'+ obj.goods_name +'</p><span class="prices">'+'￥'+'  ' + obj.price +'</span></br><input id="oBtn" type="button" value="加入购物车"></li>')
        }
        $('#oBtn').click(function () {
            if(!localStorage.token){
                location.href = 'login.html#callbackurl='+location.href;
                return;
            }
            if(localStorage.token){
                alert('添加到购物车成功，请到购物车查看');
                return;
            }
            console.log('已登陆')
        });
        $.ajax({
            'url': 'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
            'type': 'POST',
            'data': {
                'goods_id': goods_id,
                'number': 1
            },
            'dataType': 'json',
            'success': function (response) {
                console.log(response);
            }
        })

    }
})
