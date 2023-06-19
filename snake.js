class Snake {
  constructor(x, y, length) {
    this.body = [];
    for (let i = 0; i < length; i++) {
      this.body.push({x: x - i, y: y});
    }
    this.direction = 'right';
  }

  move() {
    const head = {x: this.body[0].x, y: this.body[0].y};
    switch (this.direction) {
      case 'left':
        head.x--;
        break;
      case 'up':
        head.y--;
        break;
      case 'right':
        head.x++;
        break;
      case 'down':
        head.y++;
        break;
    }
    this.body.pop();
    this.body.unshift(head);
  }

  grow() {
    const tail = {x: this.body[this.body.length - 1].x, y: this.body[this.body.length - 1].y};
    this.body.push(tail);
  }

  change_direction(direction) {
    if (this.direction === 'left' && direction === 'right' ||
        this.direction === 'up' && direction === 'down' ||
        this.direction === 'right' && direction === 'left' ||
        this.direction === 'down' && direction === 'up') {
      return;
    }
    this.direction = direction;
  }

  collides_with_wall(width, height) {
    const head = this.body[0];
    return head.x < 0 || head.x >= width || head.y < 0 || head.y >= height;
  }

  collides_with_body() {
    const head = this.body[0];
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  collides_with(other) {
    const head = this.body[0];
    console.log(head);
    return head.x === other.x && head.y === other.y;
  }
}
