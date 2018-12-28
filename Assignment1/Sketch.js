/// <reference path="../TypeScript/p5.global-mode.d.ts" />
var foobar2000Logo, androidLogo;

function preload() {
  foobar2000Logo = loadImage("Foobar 2000 Logo.png");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');

  image(foobar2000Logo, windowWidth/2, windowHeight/2);
}

function draw() {
}

function windowResized() {
  resizeCanvas(windowHeight, windowWidth);
}