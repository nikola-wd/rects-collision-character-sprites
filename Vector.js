//Setup Vector Function
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xMin = null;
    this.xMax = null;
    this.yMin = null;
    this.yMax = null;
  }

  set(x, y) {
    // reset the x,y values of an existing vector.
    this.x = x; // v.set(new_x_val, new_y_val);
    this.y = y;
  }

  setX(x) {
    // reset the x value of an existing vector.
    this.x = x; // v.setX(new_x_val);
  }

  setY(y) {
    // reset the y value of an existing vector.
    this.y = y; // v.setY(new_y_val);
  }

  magSq() {
    // returns the length of the vector, squared.
    const x = this.x,
      y = this.y;
    return x * x + y * y;
  }

  mag() {
    // returns the length of the vector.
    return Math.sqrt(this.magSq());
  }

  add(x, y) {
    // add two vectors together, or add x and y values
    if (x instanceof Vector) {
      // to an existing vector.
      this.x += x.x; // v.add(x_val, y_val) OR v.add(v2)
      this.y += x.y;
      return this;
    }
    this.x += x;
    this.y += y;
    return this;
  }

  xAtMax() {
    if (!this.xMax) return false;
    if (this.x >= this.xMax) return true;
    return false;
  }

  xAtMin() {
    if (!this.xMin) return false;
    if (this.x <= this.xMin) return true;
    return false;
  }

  yAtMax() {
    if (!this.yMax) return false;
    if (this.y >= this.yMax) return true;
    return false;
  }

  yAtMin() {
    if (!this.yMin) return false;
    if (this.y <= this.yMin) return true;
    return false;
  }

  clampX(xMin, xMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    if (this.x < xMin) this.x = xMin;
    if (this.x > xMax) this.x = xMax;
  }

  clampY(yMin, yMax) {
    this.yMin = yMin;
    this.yMax = yMax;
    if (this.y < yMin) this.y = yMin;
    if (this.y > yMax) this.y = yMax;
  }

  clamp(xMin, xMax, yMin, yMax) {
    this.clampX(xMin, xMax);
    this.clampY(yMin, yMax);
  }

  sub(x, y) {
    // same as above, with subtraction
    if (x instanceof Vector) {
      this.x -= x.x;
      this.y -= x.y;
      return this;
    }
    this.x -= x;
    this.y -= y;
    return this;
  }

  div(n) {
    // divide vector length (ie magnitude) by a constant
    this.x /= n; // v.div(divisor)
    this.y /= n;
    return this;
  }

  mult(n) {
    // multiply vector length (ie magnitude) by a constant
    this.x *= n; // v.mult(scalar)
    this.y *= n;
    return this;
  }

  multX(n) {
    // multiply vector x by a constant
    this.x *= n; // v.multX(scalar)
    return this;
  }

  multY(n) {
    // multiply vector x by a constant
    this.y *= n; // v.multY(scalar)
    return this;
  }

  normalize() {
    // set magnitude equal to 1
    return this.div(this.mag()); // v.normalize()
  }

  setMag(n) {
    // set magnitude to a given value
    return this.normalize().mult(n); // v.setMag(new_length)
  }

  dot(x, y) {
    // returns dot product of two vectors
    if (x instanceof Vector2d) {
      // v1.dot(v2) OR v.dot(x_val,y_val)
      return this.dot(x.x, x.y);
    }
    return this.x * (x || 0) + this.y * (y || 0);
  }

  dist(v) {
    // returns the distance between two points defined as vectors
    const d = v.copy().sub(this); // v1.dist(v2)
    return d.mag();
  }

  limit(l) {
    // constrain the magnitude (length) of a vector to the value
    var mSq = this.magSq(); // passed to this function.
    if (mSq > l * l) {
      // v.limit(max_length)
      this.div(Math.sqrt(mSq));
      this.mult(l);
    }
    return this;
  }

  headingRads() {
    // returns heading in radians
    const h = Math.atan2(this.y, this.x);
    return h;
  }

  headingDegs() {
    // returns heading in Degrees
    const r = Math.atan2(this.y, this.x);
    const h = (r * 180.0) / Math.PI;
    return h;
  }

  rotateRads(a) {
    // rotates the vector by given angle in radians
    const newHead = this.headingRads() + a; // v.rotateRads(angle_in_radians)
    const mag = this.mag();
    this.x = Math.cos(newHead) * mag;
    this.y = Math.sin(newHead) * mag;
    return this;
  }

  rotateDegs(a) {
    // rotates the vector by given angle in radians
    a = (a * Math.PI) / 180.0; // v.rotateDegs(angle_in_degrees)
    const newHead = this.headingRads() + a;
    const mag = this.mag();
    this.x = Math.cos(newHead) * mag;
    this.y = Math.sin(newHead) * mag;
    return this;
  }

  angleBetweenRads(x, y) {
    // find the angle between two vectors in radians
    let v1 = this.copy(),
      v2; // v1.angleBetweenRads(v2) OR v.angleBetweenRads(some_x,some_y)
    if (x instanceof Vector) {
      v2 = x.copy();
    } else {
      v2 = new Vector(x, y);
    }
    const angle = Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
    return angle;
  }

  angleBetweenDegs(x, y) {
    // same as above, except in degrees
    const r = this.angleBetweenRads(x, y);
    const d = (r * 180) / Math.PI;
    return d;
  }

  lerp(x, y, amt) {
    // linear interpolate the vector to another vector
    if (x instanceof Vector) {
      // amt is a value between 0.0 (close to the old vector)
      return this.lerp(x.x, x.y, y); // and 1.0 (close to the new vector)
    } // v1.lerp(v2, lerp_amount) OR v.lerp(some_x, some_y, lerp_amount)
    if (amt > 1.0) {
      amt = 1.0;
    }
    this.x += (x - this.x) * amt;
    this.y += (y - this.y) * amt;
    return this;
  }

  equals(x, y) {
    // checks if two vectors are identical.
    let a, b; // returns true or false
    if (x instanceof Vector2d) {
      // v1.equals(v2) OR v.equals(some_x,some_y)
      a = x.x || 0;
      b = x.y || 0;
    } else {
      a = x || 0;
      b = y || 0;
    }

    return this.x === a && this.y === b;
  }

  copy() {
    return new Vector(this.x, this.y); // returns a COPY of the vector (ie pass by value, not by reference)
  } // var v2 = v1.copy()
}

export { Vector };
