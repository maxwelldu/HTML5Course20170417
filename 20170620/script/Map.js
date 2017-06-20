(function(){
  function Map(row, col) {
    this.row = row;//行数
    this.col = col;//列数
    this.dom = null;//表格存储
    this.map = [];//二维数组存储表格地图
    this.init();//初始化
  }
  Map.prototype.init = function(){//初始化
    this.dom = document.createElement('table');//创建一个表格
    document.body.appendChild(this.dom);//将表格追加到body
    for (var i = 0; i < this.row; i++) {//遍历行
      var tr = document.createElement('tr');//创建行
      //存放当前行的td的数组，存放td的dom元素
      var thisrowtd = [];
      for (var j = 0; j < this.col; j++) {//遍历列数
        var td = document.createElement('td');//创建列
        tr.appendChild(td);//将列添加到行
        thisrowtd.push(td);//将列放到thisrowtd数组中
      }
      this.dom.appendChild(tr);//将tr添加到表格中
      this.map.push(thisrowtd);//将当前行的数组添加到tds中
    }
  }
  window.GameMap = Map;
})();
