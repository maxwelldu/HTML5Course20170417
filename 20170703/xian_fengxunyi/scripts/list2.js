var cat_id = $.getQueryString('cat_id');
var hotsale = document.getElementById('hotsale-ul');
$.ajax({
    'url': 'http://lc.shudong.wang/api_goods.php?cat_id=' + cat_id,
    'type': 'GET',
    'dataType': 'json',
    'success': function (response) {
        console.log(response);
        // console.log(response.data);
        if(response.data.length === 0){
            var oH1 = document.createElement('h1');
            hotsale.appendChild(oH1);
            oH1.innerText = "当前类别下没有商品";
            return;
        }
        for(var i=0;i<response.data.length;i++){
            var obj = response.data[i];
            $("#hotsale-ul").append('<li><a href="detail.html?goods_id='+ obj.goods_id + '">'+ obj.cat_name +' <img src="'+ obj.goods_thumb + ' " style="width: 100%;height: 100%;"><p class="mingcheng">'+ obj.goods_name + '   '+'<span class="jiage">' +obj.price + "元"+'</span></p></a></li>')
        }
    },
    "error": function(message) {
        console.log(message);
    }
})
