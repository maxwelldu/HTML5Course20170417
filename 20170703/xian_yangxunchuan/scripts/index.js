
$.ajax({
    "url": "http://lc.shudong.wang/api_goods.php",
    "type": "GET",
    "dataType": "json",
    "success": function(response){
        console.log(response);
        for(var i = 0; i < response.data.length; i++){
            var obj = response.data[i];
            var oLi = document.createElement("li");
            var oA = document.createElement("a");
            oA.href = "detail.html?goods_id=" + obj.goods_id;
            oLi.appendChild(oA);
            //可以给利用算法找到需要自定义的项
            if (i % 5 === 4) {
              oLi.className += " diy";
            }

            var oImage = document.createElement("img");
            oImage.src = obj.goods_thumb;
            var oP = document.createElement("P");
            oP.innerText = obj.goods_name;
            oA.appendChild(oImage);
            oA.appendChild(oP);
            goodsUl.appendChild(oLi);
            //jQuery 写法
            // $("#goods-ul").append("<li class='"+diyClassName+"'><a href='detail.html?cat_id="+obj.cat_id+"'><img src='"+obj.goods_thumb+"'/><p>"+obj.good_name+"</p></a></li>");

        }
    },
    "error": function(message){
        console.log(message);
    }
});
