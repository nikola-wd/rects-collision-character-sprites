import { Vector } from './Vector';
import { Sprite } from './sprite';
import { idle_sprite } from './assets/idle_sprite';
import { walk_sprite } from './assets/walk_sprite';
import { walk_left_sprite } from './assets/walk_left_sprite';

class Player {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.color = '#ffffff';
    this.width = 80;
    this.height = 80;
    this.gravity = 2.8;
    this.pos = new Vector(canvas.width * 0.5, canvas.height - this.height);
    this.vel = new Vector(0, 0);
    this.accel = new Vector(0, 0);
    this.friction = 0.87;
    this.accelXSpeed = 1;
    this.jumpWeight = -40;
    this.isJumping = false;
    this.collided = false;
    this.sprite_idle = new Sprite(this.ctx, idle_sprite, 12, 6264, 422);
    this.sprite_walk_right = new Sprite(this.ctx, walk_sprite, 12, 6264, 422);
    this.sprite_walk_left = new Sprite(
      this.ctx,
      walk_left_sprite,
      12,
      6264,
      422
    );

    this.jump = this.jump.bind(this);
    this.frame = 0;
    this.what_sprite = 'idle'; // idle, left, right
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
    this.frame++;

    console.log(this.what_sprite);

    // if (this.vel === 0) this.what_sprite = 'idle';
  }

  jump() {
    if (!this.isJumping) {
      this.vel.setY(this.jumpWeight);
      this.what_sprite = 'idle';
      this.isJumping = true;
    }
  }

  draw() {
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = this.collided ? 'blue' : this.color;
    // this.ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    // this.ctx.stroke();

    if (this.what_sprite === 'idle') {
      this.sprite_idle.draw(
        this.pos.x,
        this.pos.y,
        this.width * 1.3,
        this.height * 1.3
      );
      this.sprite_idle.update(this.frame, 3);
    }

    if (this.what_sprite === 'right') {
      this.sprite_walk_right.draw(
        this.pos.x,
        this.pos.y,
        this.width * 1.3,
        this.height * 1.3
      );
      this.sprite_walk_right.update(this.frame, 3);
    }

    if (this.what_sprite === 'left') {
      this.sprite_walk_left.draw(
        this.pos.x,
        this.pos.y,
        this.width * 1.3,
        this.height * 1.3
      );
      this.sprite_walk_left.update(this.frame, 3);
    }
  }
}

export { Player };
