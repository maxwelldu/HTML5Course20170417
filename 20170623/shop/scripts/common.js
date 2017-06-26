var navUl = document.getElementById('nav-ul');
var goodsUl = document.getElementById('goods-ul');
//获取分类信息
$.ajax({
  "url": 'http://lc.shudong.wang/api_cat.php',
  "type": "GET",
  "dataType": "json",
  "success": function(response){
    var oNavLiTemplateStr = document.getElementById('nav-li-template').innerHTML;
    //处理返回的数据
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      // if (i === 4 || i === 9) {
      if (i % 3 === 2) {
        obj.className = 'red';
      }
      obj.cat_name = '(' + obj.cat_name + ')';
      navUl.innerHTML += $.compile(oNavLiTemplateStr, obj);
      /*
      var obj = response.data[i];
      var oLi = document.createElement('li');
      var oA = document.createElement('a');
      oA.innerText = obj.cat_name;
      oA.href = "list.html?cat_id=" + obj.cat_id;
      oLi.appendChild(oA);
      navUl.appendChild(oLi);
      */
    }
  },
  "error": function(message) {
    console.log(message);
  }
});

//点击搜索跳转到搜索页，将关键字带过去
var searchBtn = document.getElementById('search-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', function(){
    console.log('click');
    //获得关键字
    var searchText = document.getElementById('search-text').value;
    console.log(searchText);

    location.href = 'search.html?search_text=' + searchText;
  });
}
