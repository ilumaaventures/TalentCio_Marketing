let ctx;
let hueCycle;
let phaseValue = 0;
const pos = { x: 0, y: 0 };
let lines = [];
let pointerMoveHandler;
let touchMoveHandler;
let touchStartHandler;
let resizeHandler;
let focusHandler;
let blurHandler;
let orientationHandler;

const config = {
  friction: 0.5,
  trails: 32,
  size: 38,
  dampening: 0.025,
  tension: 0.98
};

function Oscillator(options = {}) {
  this.phase = options.phase || 0;
  this.offset = options.offset || 0;
  this.frequency = options.frequency || 0.001;
  this.amplitude = options.amplitude || 1;
}

Oscillator.prototype.update = function update() {
  this.phase += this.frequency;
  phaseValue = this.offset + Math.sin(this.phase) * this.amplitude;
  return phaseValue;
};

function Node() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
}

function Line(options = {}) {
  this.spring = options.spring + 0.1 * Math.random() - 0.05;
  this.friction = config.friction + 0.01 * Math.random() - 0.005;
  this.nodes = [];

  for (let i = 0; i < config.size; i += 1) {
    const node = new Node();
    node.x = pos.x;
    node.y = pos.y;
    this.nodes.push(node);
  }
}

Line.prototype.update = function update() {
  let spring = this.spring;
  let node = this.nodes[0];
  node.vx += (pos.x - node.x) * spring;
  node.vy += (pos.y - node.y) * spring;

  for (let i = 0; i < this.nodes.length; i += 1) {
    node = this.nodes[i];

    if (i > 0) {
      const prev = this.nodes[i - 1];
      node.vx += (prev.x - node.x) * spring;
      node.vy += (prev.y - node.y) * spring;
      node.vx += prev.vx * config.dampening;
      node.vy += prev.vy * config.dampening;
    }

    node.vx *= this.friction;
    node.vy *= this.friction;
    node.x += node.vx;
    node.y += node.vy;
    spring *= config.tension;
  }
};

Line.prototype.draw = function draw() {
  let current;
  let next;
  let x = this.nodes[0].x;
  let y = this.nodes[0].y;

  ctx.beginPath();
  ctx.moveTo(x, y);

  for (let i = 1; i < this.nodes.length - 2; i += 1) {
    current = this.nodes[i];
    next = this.nodes[i + 1];
    x = 0.5 * (current.x + next.x);
    y = 0.5 * (current.y + next.y);
    ctx.quadraticCurveTo(current.x, current.y, x, y);
  }

  current = this.nodes[this.nodes.length - 2];
  next = this.nodes[this.nodes.length - 1];
  ctx.quadraticCurveTo(current.x, current.y, next.x, next.y);
  ctx.stroke();
  ctx.closePath();
};

function rebuildLines() {
  lines = [];

  for (let i = 0; i < config.trails; i += 1) {
    lines.push(new Line({ spring: 0.45 + (i / config.trails) * 0.025 }));
  }
}

function updatePointer(event) {
  if (event.touches?.length) {
    pos.x = event.touches[0].pageX;
    pos.y = event.touches[0].pageY;
  } else {
    pos.x = event.clientX;
    pos.y = event.clientY;
  }

  if (typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
}

function onInitialPointer(event) {
  document.removeEventListener('mousemove', onInitialPointer);
  document.removeEventListener('touchstart', onInitialPointer);

  pointerMoveHandler = (moveEvent) => updatePointer(moveEvent);
  touchMoveHandler = (moveEvent) => updatePointer(moveEvent);
  touchStartHandler = (touchEvent) => {
    if (touchEvent.touches?.length === 1) {
      pos.x = touchEvent.touches[0].pageX;
      pos.y = touchEvent.touches[0].pageY;
    }
  };

  document.addEventListener('mousemove', pointerMoveHandler);
  document.addEventListener('touchmove', touchMoveHandler, { passive: false });
  document.addEventListener('touchstart', touchStartHandler);

  updatePointer(event);
  rebuildLines();
  render();
}

function render() {
  if (!ctx?.running) {
    return;
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = `hsla(${Math.round(hueCycle.update())}, 100%, 60%, 0.07)`;
  ctx.lineWidth = 8;

  for (let i = 0; i < config.trails; i += 1) {
    const line = lines[i];
    line.update();
    line.draw();
  }

  ctx.frame += 1;
  window.requestAnimationFrame(render);
}

function resizeCanvas() {
  if (!ctx?.canvas) {
    return;
  }

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = Math.max(window.innerHeight, 720);
}

export function destroyCanvas() {
  if (ctx) {
    ctx.running = false;
  }

  document.removeEventListener('mousemove', onInitialPointer);
  document.removeEventListener('touchstart', onInitialPointer);

  if (pointerMoveHandler) {
    document.removeEventListener('mousemove', pointerMoveHandler);
  }

  if (touchMoveHandler) {
    document.removeEventListener('touchmove', touchMoveHandler);
  }

  if (touchStartHandler) {
    document.removeEventListener('touchstart', touchStartHandler);
  }

  if (orientationHandler) {
    window.removeEventListener('orientationchange', orientationHandler);
  }

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }

  if (focusHandler) {
    window.removeEventListener('focus', focusHandler);
  }

  if (blurHandler) {
    window.removeEventListener('blur', blurHandler);
  }

  lines = [];
}

export function renderCanvas(canvasId = 'canvas') {
  destroyCanvas();

  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    return;
  }

  ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.running = true;
  ctx.frame = 1;

  hueCycle = new Oscillator({
    phase: Math.random() * Math.PI * 2,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285
  });

  pos.x = window.innerWidth / 2;
  pos.y = window.innerHeight / 2;

  resizeHandler = () => resizeCanvas();
  orientationHandler = () => resizeCanvas();
  focusHandler = () => {
    if (!ctx.running) {
      ctx.running = true;
      render();
    }
  };
  blurHandler = () => {
    ctx.running = false;
  };

  document.addEventListener('mousemove', onInitialPointer);
  document.addEventListener('touchstart', onInitialPointer, { passive: false });
  window.addEventListener('orientationchange', orientationHandler);
  window.addEventListener('resize', resizeHandler);
  window.addEventListener('focus', focusHandler);
  window.addEventListener('blur', blurHandler);

  rebuildLines();
  resizeCanvas();
  render();
}
