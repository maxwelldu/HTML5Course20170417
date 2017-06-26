(function(){
	//唯一向外暴露的顶层变量
	var myajax = window.myajax = {};
	//作者、版本号等等信息
	myajax.author = "maxwelldu";
	myajax.version = "1.0.0";

	//这个对象有两个属性，get、post属性，都是函数
	myajax.get = function(URL,queryJSON,callback){
		//创建xhr对象，解决兼容问题
		if(window.XMLHttpRequest){
			var xhr = new XMLHttpRequest();
		}else{
			var xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//结果返回之后做的事情
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					callback(null,xhr.responseText);
				}else{
					callback(new Error("没有找到请求的文件"),undefined);
				}
			}
		}
		//拼接字符串
		var querystring = myajax._queryjson2querystring(queryJSON);
		//配置
		xhr.open("get" , URL + "?" + querystring , true);
		//发送
		xhr.send(null);
	};

	//这个对象有两个属性，get、post属性，都是函数
	myajax.post = function(URL,queryJSON,callback){
		//创建xhr对象，解决兼容问题
		if(window.XMLHttpRequest){
			var xhr = new window.XMLHttpRequest();
		}else{
			var xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//结果返回之后做的事情
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
					callback(null,xhr.responseText);
				}else{
					callback(new Error("没有找到请求的文件"),undefined);
				}
			}
		}
		//拼接字符串
		var querystring = myajax._queryjson2querystring(queryJSON);
		//配置
		xhr.open("post" , URL , true);
		//发送
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(querystring);
	};

	//内部函数，查询json变为查询字符串
	//输入一个{"name":"kaola","age":18,"sex":"男"}
	//返回一个name=kaola&age=18&sex=%E8%C6%B6
	myajax._queryjson2querystring = function(json){
		var arr = [];	//结果数组
		for(var k in json){
			arr.push(k + "=" + encodeURIComponent(json[k]));
		}
		return arr.join("&");
	};
})();