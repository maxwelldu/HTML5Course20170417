var $ = {
  /**
  templateStr的格式必须要有{对象的属性名}, 这样的内容会被替换
  大括号里面的属性名只能是大小写字符，数字，下划线
  dictionObj的格式是一个对象，对象里面是一系列的属性值
  */

  /**
  获取查询字符串,就是?后面的内容
  name: ?后面的名称
  */

  //一个通用的请求数据的方法，options是参数，里面主要的包括
  //url, type, dataType, success
  //url地址 type是请求方式，GET或POST， 默认是GET
  //dataType可以是string或者json, 默认是string
  //success是请求数据成功时调用的回调函数
  //调用示例：
  /**
  $.ajax({
  "url": "xxx",
  "type": "GET",
  "dataType": "json",//如果这个参数值为json, 则下面的response是对象
  "success": function(response) {
    //如果没有传上面的dataType, 则默认是字符串
    //我们需要手动转一下,需要写下面这一行代码
    // response = JSON.parse(response);
    console.log(response);
  }
  })
  */
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
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
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

    xhr.open(type, url);
    xhr.send();
  }
};
