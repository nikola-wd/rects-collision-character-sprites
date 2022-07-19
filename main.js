import { Platform } from './Platform';
import { Player } from './Player';
import './style.css';

// TODO: create better controller. Get from three js cube

const randomIntFromInterval = (min, max) => {
  if (min === max) return min;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const mouse = {
  x: 0,
  y: 0,
  pressed: false,
};

const setSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
setSize();

const player = new Player(ctx, canvas);
const platforms = [];

for (let i = 0; i < 12; i++) {
  platforms.push(
    new Platform(
      randomIntFromInterval(0, canvas.width),
      randomIntFromInterval(0, canvas.height),
      randomIntFromInterval(40, 200),
      randomIntFromInterval(20, 100),
      ctx,
      player
    )
  );
}

// ----------------------------------------------

const handleRectOnMouse = () => {
  player.pos.set(mouse.x - player.width * 0.5, mouse.y - player.height * 0.5);
  player.vel.set(0, 0);
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();

  platforms.forEach((platform) => {
    platform.update();
    platform.draw();
  });

  player.draw();

  if (mouse.pressed) {
    handleRectOnMouse();
  }

  requestAnimationFrame(animate);
}
animate();

function moveCallback({ code }) {
  if (code === 'ArrowUp') player.jump();
  if (code === 'ArrowLeft') {
    player.accel.setX(player.accelXSpeed * -1);
    player.what_sprite = 'left';
  }
  if (code === 'ArrowRight') {
    player.accel.setX(player.accelXSpeed);
    player.what_sprite = 'right';
  }
}

document.addEventListener('keydown', moveCallback);

document.addEventListener('keyup', ({ code }) => {
  if (code === 'ArrowLeft' || code === 'ArrowRight') player.accel.setX(0);
});

const toggleMouse = () => {
  mouse.pressed ? (mouse.pressed = false) : (mouse.pressed = true);
};

document.addEventListener('mousedown', toggleMouse);
document.addEventListener('mouseup', toggleMouse);

document.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', setSize);
