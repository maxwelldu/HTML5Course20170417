function showShop(page) {
  shop.api.fetchHotGoods(page, 20, function(response){
      //添加分页
      for(var j = 0; j < response.page.page_count; j++){
        $('#ButtonCenter').append($('<span>'+(j+1)+'</span>'));
      }

      for (var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        $('#shop').append($(fetchGoodsDom(obj)));
      }
  });
};

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
