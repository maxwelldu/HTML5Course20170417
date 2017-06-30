//请求分类中的商品
var cat_id = $.getQueryString('cat_id');
function showShop(page) {
  shop.api.fetchGoodsListByCatId(cat_id, page, 20, function(response){
    console.log(response);
    //如果返回的商品为空，则给出空的提示
    if (response.data.length === 0) {
      var oH1 = document.createElement('h1');
      oH1.innerText = "当前分类下面没有商品";
      document.body.appendChild(oH1);
      return;
    }
    for(var j = 0; j < response.page.page_count; j++){
      $('#ButtonCenter').append($('<span>'+(j+1)+'</span>'));
    }
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      $('#shop').append($(fetchGoodsDom(obj)));
    }
  });
}

var page = 1;
$('#ButtonPrev').click(function () {
    page --;
    if(page <= 1) page = 1;
    $('#shop').html('');
    showShop(page);
});
$('#ButtonNext').click(function () {
   page ++;
   $('#shop').html('');
   showShop(page);
});
$('#ButtonCenter').click(function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName === "SPAN"){
        page = target.innerText;
        $('#shop').html('');
        ButtonCenter.innerHTML = null;
        ButtonCenter.style.marginLeft = -page * 52 + "px";
    }
    showShop(page)
});
showShop(page);
