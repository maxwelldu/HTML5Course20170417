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
//  请求分类中的商品
var cat_id = $.getQueryString('cat_id');
$.ajax({
  "url": "http://lc.shudong.wang/api_goods.php?cat_id=" + cat_id,
  "type": "GET",
  "dataType": "json",
  "success": function(response) {
    console.log(response);
    //如果返回的商品为空，则给出空的提示
    if (response.data.length === 0) {
      var oH1 = document.createElement('h1');
      oH1.innerText = "当前分类下面没有商品";     
      goodsUl .appendChild(oH1);
      return;
    }
    for (var i = 0; i < response.data.length; i++) {    	
      var obj = response.data[i];
      
      $(goodsUl).append('<li><a href="detail.html?goods_id=' +obj.goods_id+'"><img src="'+obj.goods_thumb+'" /><p>'+ obj.goods_name +'</p></a></li>')
//    var oLi = document.createElement('li');
//    var oA = document.createElement('a');
//    oA.href = 'detail.html?goods_id=' + obj.goods_id;
//    oLi.appendChild(oA);
//    if (i % 5 === 4) {
//      oLi.className += " diy";
//    }
//    var oImage = document.createElement('img');
//    oImage.src = obj.goods_thumb;
//    var oP = document.createElement('p');
//    oP.innerText = obj.goods_name;
//    oA.appendChild(oImage);
//    oA.appendChild(oP);
//    goodsUl.appendChild(oLi);
    }
  }
});
