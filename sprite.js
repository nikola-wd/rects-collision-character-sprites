class Sprite {
  constructor(ctx, src, numberOfSprites, w, h) {
    this.ctx = ctx;
    this.image = new Image();
    this.src = src;
    this.sprites = numberOfSprites;
    this.size = {
      w: w,
      h: h,
      singleW: w / this.sprites,
    };
    this.currentFrame = 0;
    this.init();
  }

  init() {
    this.image.src = this.src;
  }

  countFrame() {
    this.currentFrame >= this.sprites - 1
      ? (this.currentFrame = 0)
      : this.currentFrame++;
  }

  update(frame, speed) {
    if (frame % speed === 0) {
      this.countFrame();
    }
  }

  draw(x, y, w, h, scale) {
    this.ctx.save();
    this.ctx.scale(scale, 1);
    this.ctx.drawImage(
      this.image,
      this.size.singleW * this.currentFrame,
      0,
      this.size.singleW,
      this.size.h,
      x,
      y,
      w,
      h
    );
    this.ctx.restore();
  }
}

export { Sprite };
