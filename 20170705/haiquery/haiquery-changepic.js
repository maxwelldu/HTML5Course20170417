haiquery.fn.changepic = function() {
  var index = 0;
  var self = this;
  setInterval(function(){
    self[0].src = '../images/'+index+'.jpg';
    index++;
    if (index > 4) {
      index = 0;
    }
  }, 1000);
}
haiquery.fn.changepics = function() {
  //修改元素的属性值
  var index = 0;
  for (var i = 0; i < this.length; i++) {
    var self = this;
    (function(i){
      setInterval(function(){
        console.log(index);
        console.log(self[index]);
        self[i].src = '../images/' + index + '.jpg';
        index++;
        if (index > 4) {
          index = 0;
        }
      }, 1000);
    })(i);
  }
}
