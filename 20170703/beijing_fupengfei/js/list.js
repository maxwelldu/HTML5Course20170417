var cat_id = $.getQueryString('cat_id');
$.ajax({
    "url": 'http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id,
    "type": "GET",
    "dataType": "json",
    "success": function(response){
        //处理返回的数据
        var listTwo = document.getElementById('list-two');
        if (response.data.length === 0){
            var oHl = document.createElement('h1');
            oHl.innerText = "当前暂无商品！";
            listTwo.appendChild(oHl);
            return;
        }
        for(var i=0; i<response.data.length; i++){
            var obj = response.data[i];
            var lines = document.createElement('li');
            var aDeta = document.createElement('a');
            var spans = document.createElement('span');
            var buy = document.createElement('span');
            var imgs = document.createElement('img');
            var span = document.createElement('span');
            aDeta.href = 'detail.html?goods_id='+ obj.goods_id;
            lines.className = "lines";
            if(i%5 === 4){
                lines.className += " Lis";
            }
            spans.className = 'spans';
            span.className = 'spana';
            buy.className = 'buy';

            spans.innerText = response.data[i].goods_name;
            imgs.src = response.data[i].goods_thumb;
            span.innerText = "￥" + response.data[i].price;
            buy.innerText = "立即抢购";
            listTwo.appendChild(lines);
            lines.appendChild(aDeta);
            aDeta.appendChild(imgs);
            aDeta.appendChild(spans);
            aDeta.appendChild(span);
            aDeta.appendChild(buy);


        }
        console.log(response);
    },
    "error": function(message) {
        //
        console.log(message);
    }
});
