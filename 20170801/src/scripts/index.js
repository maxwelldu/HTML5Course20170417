(() => {
  console.log('12345');

  class Point {
    constructor(x,y) {
      this.x = x;
      this.y = y;
    }
    show() {
      console.log(this.x + ' ' + this.y);
    }
  }
  var p = new Point(1,2);
  p.show();
})();
