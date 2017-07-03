$(function () {
   $('#Login').click(function () {
       var username = $('input[name="username"]').val();
       var password = $('input[name="password"]').val();
       $.ajax({
           "url": "http://h6.duchengjiu.top/shop/api_user.php",
           "type": "POST",
           "data":{
               "status": "login",
               "username": username,
               "password": password
           },
           "dataType": "json",
           "success": function (response) {
               console.log(response);
               // 如果登录成功，把用户信息存储到本地
               if (response.code === 0){
                   var　 data = response.data;
                   for(var prop in data) {
                       if(data.hasOwnProperty(prop)){
                           localStorage.setItem(prop, data[prop]);
                       }
                   }
                   //判断跳回首页还是购物车页
                   var  callbackurl = location.hash.substr(13);
                   if(callbackurl) {
                       location.assign(callbackurl);
                   } else {
                       location.assign('http://localhost:63342/%E7%AC%AC%E4%BA%8C%E5%A4%A9/index.html?_ijt=kgmve9efblme5jhrhuvkma9pa')
                   }
               }
           }
       })
   })
});