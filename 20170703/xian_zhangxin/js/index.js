$.ajax({
  "url": 'http://lc.shudong.wang/api_goods.php',
  "type": "GET",
  "dataType": "json",
  "success": function(response){
    //处理返回的数据
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      var oLi = document.createElement('li');
      var oA = document.createElement('a');
      oA.href = 'detail.html?goods_id=' + obj.goods_id;
      oLi.appendChild(oA);
      if (i % 5 === 4) {
        oLi.className += " diy";
      }
      var oImage = document.createElement('img');
      oImage.src = obj.goods_thumb;
      var oP = document.createElement('p');
      oP.innerText = obj.goods_name;
      oA.appendChild(oImage);
      oA.appendChild(oP);
      goodsUl.appendChild(oLi);
      var oBtn = document.createElement('button');
	    oBtn.innerText = "￥"+":"+ obj.price;
	    oA.appendChild(oBtn);
	    var Em = document.createElement('em');
	    Em.innerText = obj.goods_desc;
	    oLi.appendChild(Em);
    }
  },
  "error": function(message) {
    //
    console.log(message);
  }
});
