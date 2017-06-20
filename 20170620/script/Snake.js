(function(){
  function Snake() {
    this.bodyArr = [
      {x:3, y:5},
      {x:3, y:4},
      {x:3, y:3}
    ];
    //移动方向
    this.direction = Direction.RIGHT;
    this.render();
    this.bindEvent();
  }
  //渲染出来
  Snake.prototype.render = function(){
    for (var i = 0; i < mapObject.row; i++) {//遍历行
      for (var j = 0; j < mapObject.col; j++) {//遍历列数
        mapObject.map[i][j].className = '';
      }
    }

    for (var i = 0; i < this.bodyArr.length; i++) {
      var body = this.bodyArr[i];
      mapObject.map[body.x][body.y].className = 'snake';
    }
  }
  Snake.prototype.findHead = function() {
    var head = this.bodyArr[0];
    var newhead = {};
    switch(this.direction) {
      case Direction.RIGHT:
        //在头部加一项
        newhead = {x:head.x, y:head.y+1};
        break;
      case Direction.LEFT:
        newhead = {x:head.x, y:head.y-1};
        break;
      case Direction.UP:
        newhead = {x:head.x-1, y:head.y};
        break;
      case Direction.DOWN:
        newhead = {x:head.x+1, y:head.y};
        break;
    }
    return newhead;
  }
  Snake.prototype.move = function() {
    //到底加哪个头
    var newhead = this.findHead();
    //判断蛇是否到了边界
    if (newhead.x < 0
      || newhead.x >= mapObject.col
      || newhead.y < 0
      || newhead.y >= mapObject.row) {
      game.gameover();
      return;
    }
    //判断是否撞到自身
    for (var i = 0; i < this.bodyArr.length; i++) {
      if (newhead.x === this.bodyArr[i].x && newhead.y === this.bodyArr[i].y) {
        game.gameover();
        return;
      }
    }

    //判断是否吃到了食物, 尾巴不删，否则删除尾巴
    if (newhead.x === food.x && newhead.y === food.y) {
      food.change();
      game.addScore();
    } else {//没吃到食物时删除尾巴
      this.bodyArr.pop();//删除尾巴
    }
    this.bodyArr.unshift(newhead);
  }
  Snake.prototype.bindEvent = function(){
    var self = this;
    document.onkeydown = function(event) {
      event = event || window.event;
      switch(event.keyCode) {
        case 37: //左
          if (self.direction !== Direction.RIGHT) self.direction = Direction.LEFT;
          break;
        case 38://上
          if (self.direction !== Direction.DOWN) self.direction = Direction.UP;
          break;
        case 39://右
          if (self.direction !== Direction.LEFT) self.direction = Direction.RIGHT;
          break;
        case 40:
          if (self.direction != Direction.UP) self.direction = Direction.DOWN;
          break;
      }
    }
  }
  window.Snake = Snake;
})();
