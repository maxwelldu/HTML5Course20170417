(function(){
  var changquery = function(select) {
    return new changquery.fn.init(select);
  }
  changquery.fn  = {
    init: function(select) {
      //如果是ID选择器，根据ID选择元素
      if (select.substr(0,1) === '#') {
        var o = document.getElementById(select.substr(1));
        //this代表jquery实例化出来的对象
        //把js原生对象放到changquery对象中
        this[0] = o;
        this.length = 1;
      } else {
        //如果是普通选择器，则通过普通选择器选择元素
        var os = document.getElementsByTagName(select);
        for (var i = 0; i < os.length; i ++) {
          this[i] = os[i];
        }
        this.length = os.length;
      }
    },
    css: function(name, value) {
      console.log(this);
      //遍历所有的原生dom对象
      for (var i = 0; i < this.length; i++) {
        this[i].style[name] = value;
      }
      return this;
    },
    attr: function(name, value) {
      //当只有一个属性的时候，并且这个属性的类型是字符串时，咱们就获取属性值并返回
      if (arguments.length === 1 && typeof name === 'string') {
        return this[0].getAttribute(name);
      }

      for (var i = 0; i < this.length; i++) {
        this[i].setAttribute(name, value);
      }
      return this;
    },
    html: function(html) {
      //如果没有传递任何的参数的时候，我们直接返回当前元素的innerHTML
      if (arguments.length === 0) {
        return this[0].innerHTML;
      }

      for (var i = 0; i < this.length; i++) {
        this[i].innerHTML = html;
      }
      return this;
    },
    eq: function(index) {
      this[0] = this[index];
      for (var i = 1; i < this.length; i++) {
        delete this[i];
      }
      this.length = 1;
      return this;
    },
    /*
    click: function(cb) {
      for (var i = 0; i < this.length; i++) {
        var self = this;
        this[i].index = i;
        this[i].onclick = function(){
          cb.call(self[self.index]);
        };
      }
      return;
    }
    */
  }

  //设置init()构造函数通过原型prototype方式继承changquery.fn
  //这样new init()的对象不仅可以访问init()内部的属性和方法，而且可以访问changquery.fn对象里面的属性和方法
  changquery.fn.init.prototype = changquery.fn;

  window.cq = changquery;
})();
