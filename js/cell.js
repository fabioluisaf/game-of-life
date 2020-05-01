class Cell {
  constructor(x, y, size, state) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.live = state;
    this.willChange = false;
  }

  display() {
    strokeWeight(0);
    this.live ? fill(0) : fill(255);
    rect(this.x * this.size + 1, this.y * this.size + 1, this.size - 1, this.size - 1);
  }

  update() {
    if(this.willChange) {
      this.live = !this.live;
      this.willChange = !this.willChange;
    }
  }
}
