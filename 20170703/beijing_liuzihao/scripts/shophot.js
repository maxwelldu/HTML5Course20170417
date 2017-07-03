$.ajax({
    "url": 'http://h6.duchengjiu.top/shop/api_goods.php',
    "type": "GET",
    "dataType": "json",
    "success": function(response){
        console.log(response);
        //处理返回的数据
        for (var i = 0; i < response.data.length; i++) {
            response.data[i].index = i;
            var shopHot = document.createElement('div')
            shopHot.className = 'shophot';
            shopHots.appendChild(shopHot);
            shopHot.style.width = parseInt(getComputedStyle(shopHots).width)/ (response.data.length / 5) + 'px';
            var goods_thunbA = document.createElement('a');
            goods_thunbA.href = "detail.html?goods_id=" + response.data[i].goods_id;
            shopHot.appendChild(goods_thunbA);

            var goods_thunbImg = document.createElement('img');
            goods_thunbImg.src = response.data[i].goods_thumb;
            goods_thunbA.appendChild(goods_thunbImg);

            var goods_name = document.createElement('span');
            goods_name.innerText = response.data[i].goods_name;
            shopHot.appendChild(goods_name);

            var goods_desc = document.createElement('p');
            goods_desc.innerText = response.data[i].goods_desc;
            shopHot.appendChild(goods_desc);
        }
    },
    "error": function(message) {
        //
        console.log(message);
    }
});