// 获取参数，然后将内容放到框内



searchGoods();

function searchGoods() {
    $.ajax({
        "url": 'http://h6.duchengjiu.top/shop/api_goods.php?search_text='+searchText+'&page='+1+'&pagesize='+20,
        'type': "GET",
        'dataType': 'json',
        'success': function(response) {
            console.log(response);

            for(var i = 0; i < response.data.length; i++){
                var obj = response.data[i];
                console.log(obj);
                var shopList = $('#shopList');
                var oLi = document.createElement('li');
                shopList.append(oLi);
                var oA = document.createElement('a');
                oA.href = 'shopList.html?goods_id=' + obj.goods_id;
                oLi.appendChild(oA);
                var oImg = document.createElement('img');
                oImg.src = obj.goods_thumb;
                oA.appendChild(oImg);
                var oP = document.createElement('p');
                oP.innerText = obj.goods_desc;
                oA.appendChild(oP);
                var oSpan = document.createElement('span');
                oSpan.innerText = obj.goods_name;
                oA.appendChild(oSpan);
                var oEm = document.createElement('em');
                oEm.innerText = '售价：'+obj.price;
                oA.appendChild(oEm);
            }
        }
    });
}
Onelist();