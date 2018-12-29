var num = 1000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 10.0;
var radius = 1;
var deceleration = 0.95;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');

  noStroke();
  fill(0);
  ellipseMode(RADIUS);
  background(0);
  blendMode(ADD);

  for (var i = 0; i < num; i++) {
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
}


function draw() {
  fill(0, 0, 0);
  rect(0, 0, width, height);

  for (var i = 0; i < num; i++) {
    var distance = dist(mouseX, mouseY, x[i], y[i]);

    if (distance > 3) {
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance);
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    vx[i] += ax[i];
    vy[i] += ay[i];

    vx[i] = vx[i] * deceleration;
    vy[i] = vy[i] * deceleration;

    x[i] += vx[i];
    y[i] += vy[i];

    var velocity = dist(0, 0, vx[i], vy[i]);
    var r = map(velocity, 0, 5, 0, 255);
    var g = map(velocity, 0, 5, 64, 255);
    var b = map(velocity, 0, 5, 128, 255);
    fill(r, g, b, 32);
    ellipse(x[i], y[i], radius, radius);
  }
}