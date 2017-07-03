$(function() {
		$("#nowLogin").click(function() {
			var username = $('input[name="username"]').val();
			var password = $('input[name="password"]').val();
			console.log([username, password]);
			 //URL: 协议://IP:端口/path/文件?查询参数#a
			$.ajax({
				"url": "http://h6.duchengjiu.top/shop/api_user.php",
                "type": "POST",
                "data": {
                   "status": "login",
                   "username": username,
                   "password": password
                },
                "dataType": "json",
                "success": function(response) {
                   console.log(response);
                   //如果登录成功，把用户信息存储到本地
                   // localStorage.setItem('token', response.data.token);
                   if (response.code === 0) {
                   	 var data = response.data;
                   	 for (var prop in data) {
                   	 	if (data.hasOwnProperty(prop)) {
                   	 		localStorage.setItem(prop, data[prop])
                   	 	}
                   	 }
                   	 //跳回首页
                   	var callbackurl = location.hash.substr(13);
	                 if (callbackurl) {
	                   location.assign(callbackurl);
	                 } else {
	                    location.assign('/');
	                 }
                   }
                }
            });
		});
	});