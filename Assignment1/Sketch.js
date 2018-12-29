/// <reference path="../TypeScript/p5.global-mode.d.ts" />
var winMidX, winMidY;
var foobar2000Logo, androidLogo;
var androidColor = "#ff0000";
var gui;
var x = 0, y = 0, z = 0, a = 0, b = 0, c = 0;

function preload() {
  foobar2000Logo = loadImage("Foobar 2000 Logo.png");
  androidLogo = loadImage("Android Logo.png");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  winMidX = windowWidth / 2;
  winMidY = windowHeight / 2;

  gui = createGui('Temporary Variables');
  gui.addGlobals('androidColor');
  gui.addGlobals('x', 'y', 'z', 'a', 'b', 'c');
  noLoop();

  translate(winMidX, winMidY);
  imageCentered(androidLogo, 0, 0);
}

function draw() {
}

function imageCentered(img, x, y) {
  image(img, x - img.width / 2, y - img.height / 2);
}

function windowResized() {
  resizeCanvas(windowHeight, windowWidth);
}