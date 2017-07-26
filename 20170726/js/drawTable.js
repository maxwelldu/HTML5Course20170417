(function() {
  //绘制表格的构造函数
  var DrawTable = function(canvas, listInfo) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    //线宽
    this.lineWidth = 2;
    //可用的宽度
    this.width = this.canvas.width - this.lineWidth;
    //可用的高度
    this.height = this.canvas.height - this.lineWidth;

    //行
    this.row = listInfo.row;

    //高度的数组
    this.itemHeights = listInfo.data;
    //列数
    this.column = listInfo.data.length;
    //每一个柱状图的宽度
    this.itemWidth = 20;
    //每一个柱状图的间距
    this.itemSpace = (this.width - this.itemWidth * this.column) / this.column;
    //行高
    this.lineHeight = this.height / this.row;

    this.addTable();
  };
  //画线api
  // begin   {x:0, y:0} end {x:10, y:10}
  DrawTable.prototype.addLine = function(begin, end) {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.moveTo(begin.x + 1, begin.y + 1);
    this.ctx.lineTo(end.x + 1, end.y + 1);
    this.ctx.stroke();
  }

  //画矩形api
  //x 是画的柱状图的x坐标
  //height 是柱状图的高度
  DrawTable.prototype.addRect = function(x, height) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x, this.height - height, this.itemWidth, height);
  }
  //画表格业务逻辑
  DrawTable.prototype.addTable = function() {
    //画左侧竖线
    this.addLine({x:0, y:0}, {x:0, y:this.height});
    //画右侧竖线
    this.addLine({x:this.width, y:0}, {x:this.width, y:this.height});

    for (var i = 0; i <= this.row; i++) {
      var begin = {x:0, y:this.lineHeight * i};
      var end = {x:this.width, y:this.lineHeight * i};
      this.addLine(begin, end);
    }

    for (var i = 0; i < this.column; i++) {
      this.addRect(this.itemSpace / 2 + i * (this.itemWidth + this.itemSpace), this.itemHeights[i]);
    }
  }
  window.DrawTable = DrawTable;
})();
