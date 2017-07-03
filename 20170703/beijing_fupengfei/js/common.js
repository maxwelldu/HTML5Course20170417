$.getQueryString   = function(name) {
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
    "url": 'http://h6.duchengjiu.top/shop/api_cat.php',
    "type": "GET",
    "dataType": "json",
    "success": function(response){
        //处理返回的数据
        var oNavLiTemplateStr = document.getElementById('nav-li-template').innerHTML;
        var List = document.getElementById('list');
        for(var i=0; i<response.data.length; i++){
            var obj = response.data[i];
            $('#list').append('<li class="line"><a href="list.html?cat_id='+obj.cat_id+'">'+obj.cat_name+'</a></li>')
        }

        console.log(response);
    },
    "error": function(message) {
        //
        console.log(message);
    }
});

var searchBtn = document.getElementById('search-btn');
if (searchBtn){
    searchBtn.addEventListener('click',function () {
        console.log('click');
        var searchText = document.getElementById('search-text').value;
        console.log(searchText);
        location.href = 'search.html?search_text=' + searchText;
    })
}