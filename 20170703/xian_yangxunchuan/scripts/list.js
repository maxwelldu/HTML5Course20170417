//请求分类中的商品
var cat_id = $.getQueryString("cat_id");
$.ajax({
   "url": "http://lc.shudong.wang/api_goods.php?cat_id=" + cat_id,
    "type": "GET",
    "dataType": "json",
    "success": function(response){
       console.log(response);
       //如果返回的商品为空，则给出空的提示
        if(response.data.length === 0){
            var oP = document.createElement("p");
            var goodsUl = document.getElementById("goods-ul");
            oP.className = "notice";
            oP.innerText = "当前分类暂时没有商品展示";
            goodsUl.appendChild(oP);
            return;
        }
        for(var i = 0; i < response.data.length; i++){
            var obj = response.data[i];
            var diyClassName = "";
            if(i % 5 === 4){
                diyClassName = "diy";
            }
            var oLi = document.createElement("li");
            var oA = document.createElement("a");
            var goodsUl = document.getElementById("goods-ul");
            oA.href = "detail.html?goods_id=" + obj.goods_id;
            oLi.appendChild(oA);
            //利用算法给需要增加类名的项加上类名
            // if(i % 5 === 4){
            //     oLi.className += "plusDiy";
            // }
            var oImage = document.createElement("img");
            oImage.src = obj.goods_thumb;
            var oP = document.createElement("p");
            oP.innerText = obj.goods_name;
            oA.appendChild(oImage);
            oA.appendChild(oP);
            goodsUl.appendChild(oLi);
            //jQuery拼接写法
            //  $("#goods-ul").append("<li class='"+diyClassName+"'><a href='detail.html?goods_id="+obj.goods_id+"'><img src='"+obj.goods_thumb+"'/><p>"+obj.goods_name+"</p></a></li>")
        }

    },
    "error": function(message){
        console.log(message);
    }
});
