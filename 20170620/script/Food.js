(function(){
  function Food() {
    this.x = 0;
    this.y = 0;
    this.change();
  }
  Food.prototype.render = function(){
    mapObject.map[this.x][this.y].className = 'food';
  }
  //生成一个食物
  Food.prototype.change = function() {
    this.x = parseInt(Math.random() * mapObject.col);
    this.y = parseInt(Math.random() * mapObject.row);

    //判断食物是否在身上，如果在身上就继续执行这个方法
    for (var i = 0; i < snake.bodyArr.length; i++) {
      if (this.x === snake.bodyArr[i].x && this.y === snake.bodyArr[i].y) {
        this.change();
        return;
      }
    }
  }
  window.Food = Food;
})();
