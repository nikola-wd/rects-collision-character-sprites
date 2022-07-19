import { Vector } from './Vector';

class Player {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.color = '#ffffff';
    this.width = 50;
    this.height = 70;
    this.gravity = 2.8;
    this.pos = new Vector(canvas.width * 0.5, canvas.height - this.height);
    this.vel = new Vector(0, 0);
    this.accel = new Vector(0, 0);
    this.friction = 0.87;
    this.accelXSpeed = 1;
    this.jumpWeight = -40;
    this.isJumping = false;
    this.collided = false;
    this.jump = this.jump.bind(this);
  }

  update() {
    this.vel.add(this.accel);
    this.vel.add(0, this.gravity);

    // Friction and Move
    this.vel.multX(this.friction);
    this.pos.add(this.vel);

    // sides;
    if (this.pos.xAtMax()) {
      this.vel.multX(-0.5);
    }
    if (this.pos.xAtMin()) {
      this.vel.multX(-0.5);
    }

    //ground
    if (this.pos.yAtMax()) {
      this.vel.setY(0);
      this.isJumping = false;
    }

    this.pos.clamp(
      0,
      canvas.width - this.width,
      -Infinity,
      canvas.height - this.height
    );
    this.collided = false;
  }

  jump() {
    if (!this.isJumping) {
      this.vel.setY(this.jumpWeight);
      this.isJumping = true;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.collided ? 'blue' : this.color;
    this.ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    this.ctx.fill();
  }
}

export { Player };
