/**
 * Created by sks on 2017/3/14.
 */
(function(){
    var j = window.j = {};
    j.author = "Maxwell";
    j.version = "1.0.0";
    var Tween = {
        Linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        QuadEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadEaseOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        CubicEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        CubicEaseOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        CubicEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        QuartEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        QuartEaseOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        QuartEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        QuartEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        QuartEaseOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        QuartEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        SineEaseIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SineEaseOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        SineEaseInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        ExpoEaseIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        ExpoEaseOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        ExpoEaseInOut: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        CircEaseIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        CircEaseOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        CircEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        ElasticEaseIn: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        ElasticEaseOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        ElasticEaseInOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        BackEaseIn: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        BackEaseOut: function(t, b, c, d, s ) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        BackEaseInOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        BounceEaseIn: function(t, b, c, d) {
            return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
        },
        BounceEaseOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        BounceEaseInOut: function(t, b, c, d) {
            if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };
    j.scrollTop = function(){
        return document.body.scrollTop || document.documentElement.scrollTop;
    };
    j.windowHeight = function(){
        return document.documentElement.clientHeight || document.body.clientHeight;
    };
    j.documentHeight = function(){
      return document.documentElement.scrollHeight || document.body.scrollHeight;
    };
    j.now = function(){
        //var date = new Date();
        //return date.getTime();
        return (new Date()).getTime();
    };
    j.serializeArray = j._serialize = function(){
        var elems = biaodan.elements;
        var arr = [];
        for(var i = 0 ; i < elems.length ; i++){
            var e = elems[i];
            switch(e.type){
                case "button" :
                case "submit" :
                case "reset" :
                    break;
                case "text" :
                case "password" :
                case "textarea" :
                    arr.push(e.name + "=" + e.value);
                    break;
                case "radio":
                case "checkbox":
                    e.checked && arr.push(e.name + "=" + e.value);
                    break;
                case "select-one":
                    var options = e.getElementsByTagName("option");
                    console.log(options);
                    for(var j = 0 ; j < options.length; j++){
                        if(options[j].selected){
                            arr.push(e.name + "=" + options[j].value);
                        }
                    }
                    break;
            }
        }
        return arr;
    };
    j.serializeString = function(){
        return j._serialize().join("&");
    }
    //数据操作
    j.random = function(start, end) {
        return start + parseInt(Math.random() * (end - start));
    };
    j.shuffle = function(arr) {
        var result = [],
            rand;
        while(arr.length > 0) {
            rand = j.random(0, arr.length);
            result.push(arr[rand]);
            arr.splice(rand,1);
        }
        return result;
    };
    j.sample = function(arr, num) {
        var result = [];
        for (var i = 0; i < num; i++) {
            while(true) {//循环去找到一个合适的随机数，找到后退出循环
                var index = j.random(0, arr.length);
                //如果在数组当中找不到当前的这个数，则index可用
                if (result.indexOf(arr[index]) == -1) {
                    break;
                }
            }
            result.push(arr[index]);
        }
        return result;
    };
    j.each = function(array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i]);
        }
    };
    j.map = function(obj, fn) {
        for (var k in obj) {
            fn(k, obj[k]);
        }
    };
    //DOM
    j.children = function(obj, num) {
        var arr = [];
        for (var i = 0; i < obj.childNodes.length; i++) {
            var o = obj.childNodes[i];
            if (o.nodeType == Node.ELEMENT_NODE){
                arr.push(o);
            }
        }
        return num ? arr[num] : arr;
    };
    j.prevSibling = function(obj) {
        var prev = obj;
        while (prev = prev.previousSibling) {
            if (prev.nodeType == Node.ELEMENT_NODE) {
                return prev;
            }
        }
        return null;
    };
    j.prevAll = function(obj) {
        var arr = [];
        while(obj = obj.previousSibling) {
            if (obj.nodeType == 1) {
                arr.push(obj);
            }
        }
        return arr;
    }
    j.getAllTop = function(obj){
        var allTop = obj.offsetTop;
        var currentObj = obj;
        while(currentObj = currentObj.offsetParent){
            allTop += currentObj.offsetTop;
        }
        return allTop;
    };
    j.getAllLeft = function(obj){
        var allLeft = obj.offsetLeft;
        var currentObj = obj;
        while(currentObj = currentObj.offsetParent){
            allLeft += currentObj.offsetLeft;
        }
        return allLeft;
    };
    j.getElementsByClassName = function(className) {
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(className);
        } else {
            var aEle = document.getElementsByTagName("*");
            var arr = [];
            for (var i = 0; i < aEle.length; i++) {
                var obj = aEle[i];
                if (obj.className == className) {
                    arr.push(obj);
                }
            }
            return arr;
        }
    };
    j.compile = function(templateString , dictionary){
        return templateString.replace(/\%([a-z]+)\%/g , function(match,$1){
            return dictionary[$1];
        });
    };
    j.addEvent = function(obj,eventType,fn){
        if(obj.addEventListener){
            obj.addEventListener(eventType,fn,false);
        }else if(obj.attachEvent){
            obj.attachEvent("on" + eventType,function(){
                fn.call(obj);
            });
        }else{
            obj["on" + eventType] = fn;
        }
    };
    j.animate = function(elem , targetJSON , time , tweenString , callback){
        if(arguments.length < 3 || typeof arguments[0] != "object" || typeof arguments[1] != "object" || typeof arguments[2] != "number"){
            throw new Error("对不起，你传进来的参数数量不对或者参数类型不对，请仔细检查哦！");
            return;
        }else if(arguments.length == 3){
            tweenString = "Linear";
            callback = null;
        }else if(arguments.length == 4){
            switch(typeof arguments[3]){
                case "string" :
                    callback = null;
                    break;
                case "function" :
                    callback = arguments[3];
                    arguments[3] = "Linear";
                    break;
                default :
                    throw new Error("抱歉，第4个参数要么是缓冲描述词，要么是回调函数，请检查！");
            }
        }
        if(window.navigator.userAgent.indexOf("MSIE") != -1){
            var interval = 50;
        }else{
            var interval = 20;
        }
        elem.isanimated = true;
        var originalJSON = {};
        var deltaJSON = {};
        for(var k in targetJSON){
            originalJSON[k] = parseFloat(j.fetchComputedStyle(elem , k));
            targetJSON[k] = parseFloat(targetJSON[k]);
            deltaJSON[k] = targetJSON[k] - originalJSON[k];
        }
        var maxFrameNumber = time / interval;
        var frameNumber = 0;
        var n;
        var timer = setInterval(function(){
            for(var k in originalJSON){
                n = Tween[tweenString](frameNumber , originalJSON[k] , deltaJSON[k] , maxFrameNumber);
                if(k != "opacity"){
                    elem.style[k] = n + "px";
                }else{
                    elem.style[k] = n;
                    elem.style.filter = "alpha(opacity=" + n * 100 + ")";
                }
            }

            frameNumber++;
            if(frameNumber == maxFrameNumber){
                for(var k in targetJSON){
                    if(k != "opacity"){
                        elem.style[k] = targetJSON[k] + "px";
                    }else{
                        elem.style[k] = targetJSON[k];
                        elem.style.filter = "alpha(opacity=" + (targetJSON[k] * 100) + ")";
                    }
                }
                clearInterval(timer);
                elem.isanimated = false;
                callback && callback.apply(elem);
            }
        },interval);
    };
    j.fetchComputedStyle = function(obj , property){
        if(window.getComputedStyle){
            property = property.replace(/([A-Z])/g , function(match,$1){
                return "-" + $1.toLowerCase();
            });
            return window.getComputedStyle(obj)[property];
        }else{
            property = property.replace(/\-([a-z])/g , function(match,$1){
                return $1.toUpperCase();
            });
            return obj.currentStyle[property];
        }
    };
    j.get = function(URL, queryJSON, callback){
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300
                    || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("没有找到请求的文件"),
                        undefined);
                }
            }
        };
        var queryString = queryJSON;
        if (typeof queryJSON == "object") {
            queryString =
                j._queryjson2querystring(queryJSON);
        }
        xhr.open("GET", URL+"?"+queryString, true);
        xhr.send(null);
    };
    j.post = function(URL, queryJSON, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr =new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300
                    || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("没有找到请求的文件"), undefined);
                }
            }
        }
        xhr.open("POST", URL, true);
        var querystring = j._queryjson2querystring(queryJSON);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(querystring);
    };

    j._queryjson2querystring = function(json) {
        var arr = [];
        for (var k in json) {
            arr.push(k + "=" + encodeURIComponent(json[k]));
        }
        return arr.join("&");
    }
})();

//JSON2
if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
            f(this.getUTCMonth() + 1) + "-" +
            f(this.getUTCDate()) + "T" +
            f(this.getUTCHours()) + ":" +
            f(this.getUTCMinutes()) + ":" +
            f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
            var c = meta[a];
            return typeof c === "string"
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
            typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case "string":
                return quote(value);

            case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value)
                    ? String(value)
                    : "null";

            case "boolean":
            case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

            case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

                if (!value) {
                    return "null";
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? "[]"
                        : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                        gap
                                            ? ": "
                                            : ":"
                                    ) + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                        gap
                                            ? ": "
                                            : ":"
                                    ) + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? "{}"
                    : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                (typeof replacer !== "object" ||
                typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                        ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());