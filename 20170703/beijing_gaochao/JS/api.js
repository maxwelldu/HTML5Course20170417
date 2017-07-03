// var $ = {
//   getQueryString: function(name) {
//     var search = location.search.substr(1);
//     var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
//     var r = search.match(reg);
//     if (r === null) return null;
//     return decodeURI(r[2]);
//   },
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

var al = {
    // 获取查询字符。？后面的内容
    // name: ?后面的名称
    getQueryString: function(name){
        //substr字符串裁剪，从1开始到末尾，裁剪“？”
        var search = location.search.substr(1);
        var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
        //字符串的匹配方法，通过正则匹配，如果匹配不到则返回 null
        //能够正常匹配就返回数组里面的第一个值是整个匹配到的内容
        var r = search.match(reg);
        if(r === null) return null;
        return decodeURI(r[2]);
    },
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
      if (url === undefined) {
        //判断如果没有传递参数的时候，弹出一个异常
          throw new Error('ajax一定要传URL');
          return;//程序终止
      }
      var type = options.type || 'GET';
      //请求类型，如果为空则赋一个默认的GET；
      var dataType = options.dataType || 'string';
      //返回的数据类型，默认为string

        // 兼容处理
      var xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {//IE6方式
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      //当准备状态值改变的时候会调用的事件
        xhr.onreadystatechange = function () {
            // 判断请求到了哪一步
            if (xhr.readyState === 4) {
              //判断状态码  200 300之间成功
                if(xhr.status >=200 && xhr.status < 300 || xhr.status === 304) {
                  //如果传进来的参数里面的success是一个函数的时候
                    if((typeof options.success) === 'function'){
                      //响应的结果
                        var response = '';
                        if (dataType === 'string')  {
                          //如果数据类型为string
                          //响应的结果就直接是响应回来的字符创
                            response = xhr.responseText;
                        } else if (dataType === 'json') {
                          //如果数据类型是json
                            response = JSON.parse(xhr.responseText);//就将字符串反序列化成JSON对象
                        }
                        //调用这个回调函数，并且把相应的结果传递过去
                        options.success(response);
                    }
                } else {
                  if((typeof options.error) === 'function') {
                    options.error(xhr.responseText);
                    //如果不是函数
                  }
                }
            }
        };
      xhr.open(type, url);
      xhr.send();
    }
};