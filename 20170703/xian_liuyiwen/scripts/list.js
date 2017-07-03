$.getQueryString = function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};
$.compile = function(templateStr, dictionObj) {
    return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
        return dictionObj[$1];
    });
};
var cat_id = $.getQueryString('cat_id');
$.ajax({
    "url": "http://lc.shudong.wang/api_goods.php?cat_id=" + cat_id,
    "type": "GET",
    "dataType": "json",
    "success": function(response) {
        console.log(response);
        //如果返回的商品为空，则给出空的提示
        if (response.data.length === 0) {
            //var oH1 = document.createElement('h1');
            var oH1 =  $("<h1>当前分类下面没有商品</h1>");
            $(document.body).append(oH1);
            return;
        }
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            // var diyClassName = "";
            // var oLi = document.createElement('li');
            // var oA = document.createElement('a');
            // oA.href = 'detail.html?goods_id=' + obj.goods_id;
            // oLi.appendChild(oA);
            // if (i % 5 === 4) {
            //     oLi.className += " diy";
            // }
            // var oImage = document.createElement('img');
            // oImage.src = obj.goods_thumb;
            // var oP = document.createElement('p');
            // oP.innerText = obj.goods_name;
            // var span = document.createElement('span');
            // span.innerText = "惊爆价" + obj.price;
            // oA.appendChild(oImage);
            // oA.appendChild(oP);
            // oA.appendChild(span);
            // goodsUl.appendChild(oLi);
            $("#goods-ul").append('<li><a href="detail.html?goods_id='+obj.goods_id+'">'+ obj.cat_name+'<img src="'+ obj.goods_thumb+'" alt=""><p>'+  obj.goods_name+'</p><span>'+"惊爆价" +obj.price+"元"+'</span></a></li>');
        }
    },
    "error": function(message) {
        console.log(message);
    }

});

