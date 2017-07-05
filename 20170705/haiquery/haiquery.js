//不考虑兼容性，只在移动端使用
function haiquery(selecter) {
  return new haiquery.fn.init(selecter);
};
haiquery.fn = {
    init: function(selecter) {
      var eles = document.querySelectorAll(selecter);
      this.length = eles.length;
      for (var i = 0; i < eles.length; i++) {
        this[i] = eles[i];
      }
    },
    css: function(k, v) {
      for (var i = 0; i < this.length; i++) {
        this[i].style[k] = v;
      }
      return this;
    }
};
haiquery.fn.init.prototype = haiquery.fn;
var hq = haiquery;
