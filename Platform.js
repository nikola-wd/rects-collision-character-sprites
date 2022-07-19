import { Vector } from './Vector';
import { collisionDetection } from './collisionDetection';

const randomIntFromInterval = (min, max) => {
  if (min === max) return min;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

class Platform {
  constructor(x, y, width, height, ctx, player) {
    this.ctx = ctx;
    this.player = player;
    this.vel = new Vector(0, -1);
    this.pos = new Vector(x, y);
    this.width = width;
    this.height = height;
    this.collided = false;
    this.color = 'yellow';
  }

  checkCollisions() {
    const collision = collisionDetection(this.player, this);

    if (collision) {
      this.collided = true;
      this.player.collided = true;

      if (collision === 'top') {
        this.player.pos.setY(this.pos.y - this.player.height + this.vel.y);
        this.player.vel.setY(0);
        this.player.isJumping = false;
      }

      if (collision === 'bottom') {
        this.player.vel.multY(-0.1);
        this.player.pos.setY(this.pos.y + this.height);
      }

      if (collision === 'left') {
        this.player.vel.multX(-0.1);
        this.player.pos.setX(this.pos.x - this.player.width);
      }

      if (collision === 'right') {
        this.player.vel.multX(-0.1);
        this.player.pos.setX(this.pos.x + this.width);
      }
    } else {
      this.collided = false;
    }
  }

  update() {
    this.checkCollisions();
    this.pos.add(this.vel);
    if (this.pos.y < -this.height - randomIntFromInterval(0, 200)) {
      this.pos.setY(canvas.height);
    }
    if (this.collided) {
      this.color = 'red';
    } else {
      this.color = 'yellow';
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

export { Platform };
