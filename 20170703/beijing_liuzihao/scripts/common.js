// var shopLists = document.getElementById('shopLists');
//
// //获取分类信息
// $.ajax({
//   "url": 'http://h6.duchengjiu.top/shop/api_cat.php',
//   "type": "GET",
//   "dataType": "json",
//   "success": function(response){
//     var oNavLiTemplateStr = document.getElementById('nav-li-template').innerHTML;
//     //处理返回的数据
//     console.log(response);
//     for (var i = 0; i < response.data.length; i++) {
//       var obj = response.data[i];
//       obj.className = "navlists"
//       obj.cat_name = obj.cat_name ;
//       shopLists.innerHTML += $.compile(oNavLiTemplateStr, obj);
//     }
//   },
//   "error": function(message) {
//     console.log(message);
//   }
// });

//点击搜索跳转到搜索页，将关键字带过去
// var goserch = document.getElementById('goserch');
// var serchtext = document.getElementById('serchtext');
// goserch.onmouseover = function () {
// 	var serchText = serchtext.value;
// 	location.href = "serch.html?serch_text=" + serchText;
// }
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