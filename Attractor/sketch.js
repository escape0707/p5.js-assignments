/// <reference path="../TypeScript/p5.global-mode.d.ts" />

let num = 1000;
let vx = new Array(num);
let vy = new Array(num);
let x = new Array(num);
let y = new Array(num);
let ax = new Array(num);
let ay = new Array(num);

const magnetism = 10.0;
const radius = 1;
const deceleration = 0.95;
const lorentz = 0.2;

let sketchStarted = false;
let clicked = false;
let mX, mY;

function newParticle(i) {
  x[i] = random(width);
  y[i] = random(height);
  vx[i] = 0;
  vy[i] = 0;
  ax[i] = 0;
  ay[i] = 0;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');

  background(0);
  push();
    stroke('#077def');
    noFill();
    textAlign(CENTER, CENTER);
    textSize(50);
    text('    Move or click your mouse...', width / 2, height / 2);
  pop();

  for (let i = 0; i < num; i++) {
    newParticle(i);
  }

  noStroke();
  ellipseMode(RADIUS);
  blendMode(ADD);

  noLoop();
}

function draw() {  
  if (!sketchStarted) {
    return;
  }
    
  if (!clicked) {
    mX = mouseX;
    mY = mouseY;
  }

  for (let i = 0; i < num; i++) {
    let distance = dist(mX, mY, x[i], y[i]);

    if (clicked && distance < 3) {
      newParticle(i);
      continue;
    }

    if (clicked || distance > 3) {
      ax[i] = magnetism * (mX - x[i]) / (distance * distance);
      ay[i] = magnetism * (mY - y[i]) / (distance * distance);
    }
    
    if (clicked) {
      ay[i] += vx[i] * lorentz;
      ax[i] += -vy[i] * lorentz;
    }

    vx[i] += ax[i];
    vy[i] += ay[i];

    vx[i] = vx[i] * deceleration;
    vy[i] = vy[i] * deceleration;

    x[i] += vx[i];
    y[i] += vy[i];

    let velocity = dist(0, 0, vx[i], vy[i]);
    let r = map(velocity, 0, 5, 0, 255);
    let g = map(velocity, 0, 5, 64, 255);
    let b = map(velocity, 0, 5, 128, 255);
    fill(r, g, b, 32);
    ellipse(x[i], y[i], radius, radius);
  }
}

function startSketch() {
  sketchStarted = true;
  push();
    blendMode(BLEND);
    background(0);
  pop();
  loop();
}

function mouseMoved() {
  if (!sketchStarted) {
    startSketch();
  }
  return false;
}

function mouseClicked() {
  if (!clicked) {
    clicked = true;
    mX = mouseX;
    mY = mouseY;
    startSketch();
  }
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}