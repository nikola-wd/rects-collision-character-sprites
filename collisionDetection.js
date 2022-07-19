const collisionDetection = (obj1, obj2) => {
  let collided = false;

  if (
    obj1.pos.x + obj1.vel.x < obj2.pos.x + obj2.vel.x + obj2.width &&
    obj1.pos.x + obj1.vel.x + obj1.width > obj2.pos.x + obj2.vel.x &&
    obj1.pos.y + obj1.vel.y < obj2.pos.y + obj2.vel.y + obj2.height &&
    obj1.height + obj1.pos.y + obj1.vel.y > obj2.pos.y + obj2.vel.y
  ) {
    collided = true;
  }

  if (!collided) return false;

  let player_bottom = obj1.pos.y + obj1.vel.y + obj1.height;
  let tiles_bottom = obj2.pos.y + obj2.vel.y + obj2.height;
  let player_right = obj1.pos.x + obj1.vel.x + obj1.width;
  let tiles_right = obj2.pos.x + obj2.vel.x + obj2.width;

  let b_collision = tiles_bottom - obj1.pos.y + obj1.vel.y;
  let t_collision = player_bottom - obj2.pos.y + obj2.vel.y;
  let l_collision = player_right - obj2.pos.x + obj2.vel.x;
  let r_collision = tiles_right - obj1.pos.x + obj1.vel.x;

  if (
    t_collision < b_collision &&
    t_collision < l_collision &&
    t_collision < r_collision
  ) {
    //Top collision
    return 'top';
  }
  if (
    b_collision < t_collision &&
    b_collision < l_collision &&
    b_collision < r_collision
  ) {
    //bottom collision
    return 'bottom';
  }
  if (
    l_collision < r_collision &&
    l_collision < t_collision &&
    l_collision < b_collision
  ) {
    //Left collision
    return 'left';
  }
  if (
    r_collision < l_collision &&
    r_collision < t_collision &&
    r_collision < b_collision
  ) {
    //Right collision
    return 'right';
  }
};

export { collisionDetection };
