var $ = {
    /**
     templateStr的格式必须要有{对象的属性名}, 这样的内容会被替换
     大括号里面的属性名只能是大小写字符，数字，下划线
     dictionObj的格式是一个对象，对象里面是一系列的属性值
     */
    compile: function(templateStr, dictionObj) {
        return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
            return dictionObj[$1];
        });
    },
    /**
     获取查询字符串,就是?后面的内容
     name: ?后面的名称
     */
    getQueryString: function(name) {
        //location是每个页面上都有的一个定位对象，
        //里面的search就是?后面的内容
        //substr字符串裁剪，从1开始到末尾, 裁剪了?
        var search = location.search.substr(1);
        //&或者开头是name, 后面跟上=非&的0个或多个；最后以&或者尾巴符结尾
        //username=max&age=18&sex=男
        //username   (&|^)username=([^&]*)(&|$)
        var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
        //字符串的匹配方法，通过正则匹配, 如果匹配不到则返回 null
        //能够正常匹配，返回的数组里面的第一个值是整个匹配到的内容
        //下标为1的表示第一个小括号匹配到的内容，下标为2的表示第二个小括号是我们需要的值
        var r = search.match(reg);
        if (r === null) return null;
        //encodeURI是对字符串进行编码成URI的格式，
        //比如空格 会转换成%20
        //decodeURI 解码
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
var $ = {
    /**
     templateStr的格式必须要有{对象的属性名}, 这样的内容会被替换
     大括号里面的属性名只能是大小写字符，数字，下划线
     dictionObj的格式是一个对象，对象里面是一系列的属性值
     */
    compile: function(templateStr, dictionObj) {
        return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
            return dictionObj[$1];
        });
    },
    /**
     获取查询字符串,就是?后面的内容
     name: ?后面的名称
     */
    getQueryString: function(name) {
        //location是每个页面上都有的一个定位对象，
        //里面的search就是?后面的内容
        //substr字符串裁剪，从1开始到末尾, 裁剪了?
        var search = location.search.substr(1);
        //&或者开头是name, 后面跟上=非&的0个或多个；最后以&或者尾巴符结尾
        //username=max&age=18&sex=男
        //username   (&|^)username=([^&]*)(&|$)
        var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
        //字符串的匹配方法，通过正则匹配, 如果匹配不到则返回 null
        //能够正常匹配，返回的数组里面的第一个值是整个匹配到的内容
        //下标为1的表示第一个小括号匹配到的内容，下标为2的表示第二个小括号是我们需要的值
        var r = search.match(reg);
        if (r === null) return null;
        //encodeURI是对字符串进行编码成URI的格式，
        //比如空格 会转换成%20
        //decodeURI 解码
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
var $ = {
    /**
     templateStr的格式必须要有{对象的属性名}, 这样的内容会被替换
     大括号里面的属性名只能是大小写字符，数字，下划线
     dictionObj的格式是一个对象，对象里面是一系列的属性值
     */
    compile: function(templateStr, dictionObj) {
        return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
            return dictionObj[$1];
        });
    },
    /**
     获取查询字符串,就是?后面的内容
     name: ?后面的名称
     */
    getQueryString: function(name) {
        //location是每个页面上都有的一个定位对象，
        //里面的search就是?后面的内容
        //substr字符串裁剪，从1开始到末尾, 裁剪了?
        var search = location.search.substr(1);
        //&或者开头是name, 后面跟上=非&的0个或多个；最后以&或者尾巴符结尾
        //username=max&age=18&sex=男
        //username   (&|^)username=([^&]*)(&|$)
        var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
        //字符串的匹配方法，通过正则匹配, 如果匹配不到则返回 null
        //能够正常匹配，返回的数组里面的第一个值是整个匹配到的内容
        //下标为1的表示第一个小括号匹配到的内容，下标为2的表示第二个小括号是我们需要的值
        var r = search.match(reg);
        if (r === null) return null;
        //encodeURI是对字符串进行编码成URI的格式，
        //比如空格 会转换成%20
        //decodeURI 解码
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
