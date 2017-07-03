// $.ajax({url,type,dataType,success});
// var $ = {
//     getQueryString: function(name) {
//         var search = location.search.substr(1);
//         var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
//         var r = search.match(reg);
//         if (r === null) return null;
//         return decodeURI(r[2]);
//     },
//   ajax: function(options) {
//     var url = options.url;
//     if (url === undefined) {
//       throw new Error('ajax一定要传URL');
//       return;
//     }
//     var type = options.type || 'GET';//请求类型
//     var dataType = options.dataType || 'string';
//
//     var xhr = null;
//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else {
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//         if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
//           if ((typeof options.success) === 'function') {
//             var response = '';
//             if (dataType === 'string') {
//               response = xhr.responseText;
//             } else if(dataType === 'json') {
//               response = JSON.parse(xhr.responseText);
//             }
//             options.success(response);
//           }
//         } else {
//           if ((typeof options.error) === 'function') {
//             options.error(xhr.responseText);
//           }
//         }
//       }
//     };
//
//     xhr.open(type, url);
//     xhr.send();
//   }
// };
var goserch = document.getElementById('goserch');
var serchtext = document.getElementById('serchtext');
goserch.onclick= function () {
	console.log(1);
	var serchText = serchtext.value;
	location.href = "serch.html?serch_text=" + serchText;
};
if(localStorage.token){
    console.log(1);
    $(".register").html("个人中心");
    // $(".register").attr("herf","#");
    $(".loding").html("注销").click(function () {
        localStorage.clear();
        if (Storage.length === 0){
            $(".loding").html("登录")
            alert("注销成功");
        }
        return false;
    });

}


// .click(function () {
//
// })
