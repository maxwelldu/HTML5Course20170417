/**
 * Created by Administrator on 2017/6/23.
 */
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
var goods_id = $.getQueryString("goods_id");
console.log(goods_id);
shop.api.fetchGoodsDetail(goods_id, function(response){
        var obj = response.data[0];
        console.log(obj);
        $(".body").append(
            '<div class="oDiv"><img src="'+obj.goods_thumb+'" alt="">' +
            '<p>'+obj.goods_desc+'</p>' +
            '<button class="button"> '+"加入购物车"+'</button>' +
            '</div>'
        )
        $(".button").click(function () {
            if(!localStorage.token){
                location.href = "login.html#callbackurl=" + location.href;
                return
            }
            if(localStorage.token){
                alert("添加购物车成功，请到购物车查看！")
                return
            }
        })
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
            "type": "POST",
            "data": {
                "goods_id": goods_id,
                "number": 1
            },
            "dataType": "json",
            "success": function(response) {
                console.log(response);
            }
        });
        // var oDiv = document.createElement('div');
        // var oImg = document.createElement('img');
        // oImg.src = obj.goods_thumb;
        // oDiv.appendChild(oImg);
        // oDiv.className="oDiv";
        // var oP = document.createElement('p');
        // oP.innerText = obj.goods_desc;
        // oDiv.appendChild(oP);
        //
        // var oBtn = document.createElement('button');
        // oBtn.innerText = '加入购物车';
        // oDiv.appendChild(oBtn);
        // document.body.appendChild(oDiv);


})
