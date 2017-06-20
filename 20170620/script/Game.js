(function(){
  function Game() {
    this.timer = 0;
    this.score = 0;
    this.scoreDom = null;
    this.init();
  }
  Game.prototype.init = function(){
    this.scoreDom = document.createElement('div');
    this.scoreDom.className = 'score';
    document.body.appendChild(this.scoreDom);

    this.timer = setInterval(function(){
      snake.move();
      snake.render();

      food.render();

      game.render();
    }, 100);
  }
  Game.prototype.gameover = function() {
    clearInterval(this.timer);
    alert('game over');
  }
  Game.prototype.gameVictory = function() {
    // if (snake.bodyArr.length === mapObject.row * mapObject.col) {
    console.log(game.score);
    if (game.score >= 10) {
      clearInterval(this.timer);
      alert('Victory');
    }
  }
  Game.prototype.render = function() {
    this.scoreDom.innerText = "得分：" + this.score;
  }
  Game.prototype.addScore = function() {
    this.score ++;
    this.gameVictory();
  }
  window.Game = Game;
})();
