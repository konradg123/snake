class Food {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
  }

  draw() {
    // code to draw the food on the screen
  }

  collides_with(other) {
    return this.x === other.x && this.y === other.y;
  }
}
