// Refer this .ts file to have Intellisense in Visual Studio Code.
/// <reference path="../TypeScript/p5.global-mode.d.ts" />

function setup() {
  var canvas = createCanvas(windowWidth/2, windowHeight/2);
  canvas.style('display', 'block');
}

function draw() {
}

function windowResized() {
  resizeCanvas(windowHeight, windowWidth);
}