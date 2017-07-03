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
 
 
 $.ajax({
        "url": 'http://lc.shudong.wang/api_cat.php',
        "type": "GET",
        "dataType": "json",
        "success": function(response){
          //处理返回的数据
          console.log(response);
        
          for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
          
            var oLi = document.createElement('li');
            var oA = document.createElement('a');
            oA.innerText = obj.cat_name;
            oA.href = "list.html?cat_id=" + obj.cat_id;
            oLi.appendChild(oA);
            navUl.appendChild(oLi);
          }
        },
        "error": function(message) {
          //
          console.log(message);
        }
      });