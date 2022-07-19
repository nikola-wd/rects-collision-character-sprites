const vector = {
  // _ supposed to be private
  _x: 1, // 1 means that it's a unit vector
  _y: 0,

  create: function (x, y) {
    var obj = Object.create(this);
    obj.setX(x);
    obj.setY(y);
    return obj;
  },

  setX: function (value) {
    this._x = value;
  },
  getX: function () {
    return this._x;
  },

  setY: function (value) {
    this._y = value;
  },
  getY: function () {
    return this._y;
  },

  setAngle: function (angle) {
    const length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },

  getAngle: function () {
    return Math.atan2(this._y, this._x);
  },

  setLength: function (length) {
    const angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },
  getLength: function () {
    // get hypot
    return Math.sqrt(this._x * this._x + this._y * this._y);
    // return Math.hypot(this._x, this._y)
  },

  add: function (v2) {
    return vector.create(this._x + v2.getX(), this._y + v2.getY());
  },
  subtract: function (v2) {
    return vector.create(this._x - v2.getX(), this._y - v2.getY());
  },

  // takes scalar value as an arg
  // scalar multiplication
  multiply: function (val) {
    return vector.create(this._x * val, this._y * val);
  },
  // takes scalar value as an arg
  // scalar division
  divide: function (val) {
    return vector.create(this._x / val, this._y / val);
  },

  // Alter existing instead of creating new v
  addTo: function (v2) {
    this._x += v2.getX;
    this._y += v2.getY;
  },
  // Maybe subtractWith
  subtractFrom: function (v2) {
    this._x -= v2.getX();
    this._y -= v2.getY();
  },
  multiplyBy: function (val) {
    this._x *= val;
    this._y *= val;
  },
  divideBy: function (val) {
    this._x /= val;
    this._y /= val;
  },
};

export { vector };
