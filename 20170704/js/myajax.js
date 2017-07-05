(function(){
	//唯一向外暴露的顶层变量
	var myajax = window.myajax = {};
	//作者、版本号等等信息
	myajax.author = "考拉";
	myajax.version = "2.0.0";
	//2.0.0主要的版本增加了jsonp的发送

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
		URL = querystring ? (URL + "?" + querystring) : URL;
		//配置
		xhr.open("get" , URL , true);
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

	myajax.jsonp = function(URL,queryJSON,callbackname,callback){
		//在window对象上强行增加一个属性，这个属性就是全局变量，是一个函数的名字，值是一个函数
		window[callbackname] = callback;
		//创建节点
		var scriptObj = document.createElement("script");
		//添加节点
		document.body.appendChild(scriptObj);
		//拼接字符串
		var querystring = myajax._queryjson2querystring(queryJSON);
		//设置新创建的script标签的src属性，HTTP上行请求将发出
		scriptObj.src = querystring ? (URL + "?" + querystring) : URL;
		//删除这个script标签
		document.body.removeChild(scriptObj);
		//删除系统的
		delete window[callbackname];
	}

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