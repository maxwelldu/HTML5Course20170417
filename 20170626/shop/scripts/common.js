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
    var oNavLiTemplateStr = document.getElementById('nav-li-template').innerHTML;
    //处理返回的数据
    for (var i = 0; i < response.data.length; i++) {
      var obj = response.data[i];
      var diyClassName = '';
      if (i % 5 === 0) {
        diyClassName = "zihao";
      }
      $('#nav-ul').append('<li class="' + diyClassName + '"><a href="list.html?cat_id=' + obj.cat_id + '">' + obj.cat_name + '</a></li>')
    }
  },
  "error": function(message) {
    console.log(message);
  }
});

var searchBtn = $("#search-btn");
if (searchBtn.length === 1) {
  searchBtn.click(function(){
    location.href = 'search.html?search_text=' + $("#search-text").val();
  });
}
