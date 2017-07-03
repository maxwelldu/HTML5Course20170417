var $ = {
    compile:function(templateStr, dictionObj) {
        return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
            return dictionObj[$1];
        });
    },
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
