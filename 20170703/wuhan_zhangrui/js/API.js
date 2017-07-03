var $ = {
	compile: function(templateStr, dictionObj) {
		return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
			return dictionObj[$1];
		});
	},

	getQueryString: function(name) {
		var search = location.search.substr(1);
		var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
		var r = search.match(reg);
		if(r === null) return null;
		return decodeURI(r[2]);
	},
	 ajax: function(options) {
    var url = options.url;//先得到地址
    if (url === undefined) {//判断如果没有传递参数的时候，弹出一个异常
      throw new Error('ajax一定要传URL');
      return;//程序终止
    }
    var type = options.type || 'GET';//请求类型,如果为空则赋一个默认的GET
    var dataType = options.dataType || 'string';//返回的数据类型，默认为string

    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {//IE6需要使用以下的方式创建
      xhr = new ActiveXObject("Mirosoft.XMLHTTP");
    }
    //当准备状态值改变的时候会调用的事件
    //多个状态值，自己先看一下，好奇的同学
    xhr.onreadystatechange = function() {
      //4表示请求已经完成
      if (xhr.readyState === 4) {
        //判断一下HTTP请求的状态码,如果成功或者有缓存
        

        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          //如果传进来的参数里面的success是一个函数的时候
          if ((typeof options.success) === 'function') {
            //响应的结果
            var response = '';
            if (dataType === 'string') {//如果数据类型为string
              //响应的结果就直接是响应回来的字符串
              response = xhr.responseText;
            } else if(dataType === 'json') {//如果数据类型是json
              try {
                response = JSON.parse(xhr.responseText);//将字符串反序列化成JSON对象
              } catch (error) {
                //错误处理，当返回的数据不是合法的json
                response = { data: [] };
              }
            }
            //调用这个回调函数，并且把响应的结果传递过去
             options.success(response);
          }
        } else {
          if ((typeof options.error) === 'function') {
            options.error(xhr.responseText);
          }
        }
      }
    };

    xhr.open(type, url, true);
    xhr.send();
  }
};
