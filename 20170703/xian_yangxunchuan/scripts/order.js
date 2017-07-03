shop.api.fetchOrder(function(response){
    var html = '';
    for (var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];//订单信息
        console.log(obj);
        html += '<div class="order-item">';
        html += '<div class="order-item-header">订单号：'+obj.order_id+'</div>';
        for (var j = 0; j < obj.goods_list.length; j++) {
            var goods = obj.goods_list[j];//商品列表
            goods.subtotal = goods.goods_price * goods.goods_number;

            html += '<div data-id="'
                + goods.goods_id
                + '"><img width="100px" src="'
                + goods.goods_thumb
                + '" />&nbsp;&nbsp;|&nbsp;&nbsp;'
                + goods.goods_name
                + '&nbsp;&nbsp;|&nbsp;&nbsp;'
                + goods.goods_number
                + '&nbsp;&nbsp;|&nbsp;&nbsp;'
                + goods.goods_price
                + '&nbsp;&nbsp;|&nbsp;&nbsp;'
                + goods.subtotal
                + '</div>';
        }
        html += '</div>';
    }
    $('#order-list').html(html);
});