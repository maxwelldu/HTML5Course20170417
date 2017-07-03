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
        var search = location.search.substr(1);
        var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
        var r = search.match(reg);
        if (r === null) return null;
        return decodeURI(r[2]);
    },
    ajax: function(options) {
        var url = options.url;
        if (url === undefined) {
            throw new Error('ajax一定要传URL');
            return;
        }
        var type = options.type || 'GET';//请求类型
        var dataType = options.dataType || 'string';

        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    if ((typeof options.success) === 'function') {
                        var response = '';
                        if (dataType === 'string') {
                            response = xhr.responseText;
                        } else if(dataType === 'json') {
                            response = JSON.parse(xhr.responseText);
                        }
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