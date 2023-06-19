class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.score = 0;
    this.snake = new Snake(Math.floor(width / 2), Math.floor(height / 2), 3);
    this.food = null;
    this.interval = null;
    this.paused = false;
    this.game_over = false;
    this.multiplier = 60;
    this.moved = false;

    this.counter = document.getElementById('counter');
    this.lastCount = document.getElementById('lastCount');
    this.ctx = document.getElementById("canvas").getContext("2d");

    this.headUp = new Image;
    this.headUp.src = 'przemek.png';
    this.headLeft = new Image;
    this.headLeft.src = 'przemek-left.png';
    this.headDown = new Image;
    this.headDown.src = 'przemek-down.png';
    this.headRight = new Image;
    this.headRight.src = 'przemek-right.png';

    this.niebezp = new Image;
    this.niebezp.src = 'niebezp.png';

    this.makulatura = new Image;
    this.makulatura.src = 'makulatura.png';

    this.plastik = new Image;
    this.plastik.src = 'plastik.png';

    this.waste = [this.plastik, this.makulatura, this.niebezp];
  }

  start() {
    this.draw();
    this.interval = setInterval(() => {
      this.moved = false
      if (!this.paused && !this.game_over) {
        this.update();
        this.draw();

      }
    }, 150);
  }

  stop() {
    clearInterval(this.interval);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  update() {
    this.snake.move();

    if (this.snake.collides_with_wall(this.width, this.height) || this.snake.collides_with_body()) {
      this.game_over = true;
    }
    if (this.food && this.snake.collides_with(this.food)) {
      this.snake.grow();
      let lastCount = Math.random() * (10000) - 3000;
      this.score += lastCount;

      this.counter.innerHTML = this.score.toFixed(2);
      this.lastCount.innerHTML = lastCount.toFixed(2);
      if(lastCount > 0) {
        this.lastCount.style.color = 'olive';
      }
      else {
        this.lastCount.style.color = 'red';
      }
      this.food = null;
    }
    if (this.food === null) {
      this.food = new Food(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height), this.waste[Math.floor((Math.random()*this.waste.length))]);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width*this.multiplier, this.height*this.multiplier);

    this.drawBoard();
    this.drawFood();
    this.drawSnake();
  }

  drawBoard() {
    this.ctx.fillStyle = "#EEEEEE";
    this.ctx.fillRect(0, 0, this.width*this.multiplier, this.height*this.multiplier);
  }

  drawFood() {
    if(!this.food) return;

    this.ctx.drawImage(this.food.image, this.food.x*this.multiplier, this.food.y*this.multiplier, this.multiplier, this.multiplier)
  }

  drawSnake() {
    if(!this.snake.body.length) return;

    let direction = 0;

    switch(this.snake.direction) {
      case 'left':
        direction = 'headLeft';
        break;
      case 'up':
        direction = 'headUp';
        break;
      case 'right':
        direction = 'headRight';
        break;
      case 'down':
        direction = 'headDown';
        break;
    }
    this.drawHead(this.snake.body[0].x, this.snake.body[0].y, direction)


    for (let i = 1; i < this.snake.body.length; i++) {
      this.drawPixel(this.snake.body[i].x, this.snake.body[i].y, "#000000")
    }
  }

  drawPixel(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x*this.multiplier,
      y*this.multiplier,

      this.multiplier,
      this.multiplier
    );
  }

  drawHead(x, y, direction) {
    this.ctx.drawImage(this[direction], x*this.multiplier, y*this.multiplier, this.multiplier, this.multiplier)
  }

  handle_input(event) {
    if(this.moved) {
       return;
    }
    switch (event.keyCode) {
      case 37: // left arrow key
        this.snake.change_direction('left');
        break;
      case 38: // up arrow key
        this.snake.change_direction('up');
        break;
      case 39: // right arrow key
        this.snake.change_direction('right');
        break;
      case 40: // down arrow key
        this.snake.change_direction('down');
        break;
      case 32: // spacebar
        if (this.game_over) {
          this.restart();
        } else if (this.paused) {
          this.resume();
        } else {
          this.pause();
        }
        break;
    }

    this.moved = true;
  }

  restart() {
    this.score = 0;
    this.snake = new Snake(Math.floor(this.width / 2), Math.floor(this.height / 2), 3);
    this.food = null;
    this.game_over = false;
  }
}
