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


var goodsUl = document.getElementById('goods-ul');
//获取分类信息
$.ajax({
  "url": 'http://lc.shudong.wang/api_cat.php',
  "type": "GET",
  "dataType": "json",
  "success": function(response){
    // var oNavLiTemplateStr = document.getElementById('nav-li-template').innerHTML;
    //处理返回的数据
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
         //这是两种写法
        // var oLi = document.createElement('li');
        // var oA = document.createElement('a');
        // oA.innerText = obj.cat_name;
        // oA.href = "list.html?cat_id=" + obj.cat_id;
        // oLi.appendChild(oA);
        // navUl.appendChild(oLi);
      var diyClassName = '';
      if (i % 5 === 0) {
        diyClassName = "diy";
      }
      $('#nav-ul').append('<li class="' + diyClassName + '"><a href="list.html?cat_id=' + obj.cat_id + '">' + obj.cat_name + '</a></li>')
    }
  },
  "error": function(message) {
    console.log(message);
  }
});

$("#quit").click(function(){
  localStorage.clear();
});

var searchBtn = $("#search-btn");
if (searchBtn.length === 1) {
  searchBtn.click(function(){
    location.href = 'search.html?search_text=' + $("#search-text").val();
  });
}

// //点击搜索跳转到搜索页，将关键字带过去
// var searchBtn = document.getElementById('search-btn');
// if (searchBtn) {
//     searchBtn.addEventListener('click', function(){
//         console.log('click');
//         //获得关键字
//         var searchText = document.getElementById('search-text').value;
//         console.log(searchText);
//
//         location.href = 'search.html?search_text=' + searchText;
//     });
// }