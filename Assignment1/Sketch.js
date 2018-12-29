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
  sliderRange(-100, 100, 1);
  gui.addGlobals('androidColor');
  gui.addGlobals('x', 'y', 'z', 'a', 'b', 'c');
  noLoop();
}

function drawAndroid() {
  let debugColor = color(androidColor);
  debugColor.setAlpha(150);
  push();
    fill(debugColor);
    stroke(debugColor);
    const deltaX = 0, deltaY = -29;
    translate(deltaX, deltaY);
    drawBody();
  pop();

  function drawBody() {
    const bodyWidth = 97, bodyHeight = 83, cornerRadius = 12;
    push();
      noStroke();
      rect(-bodyWidth / 2, 0, bodyWidth, bodyHeight, 0, 0, cornerRadius, cornerRadius);
    pop();
    drawArms();

    function drawArms() {
      const shoulderWidth = 64, shoulderHeight = 9;
      push();
        translate(shoulderWidth, shoulderHeight);
        drawArm();
      pop();
      push();
        translate(-shoulderWidth, shoulderHeight);
        drawArm();
      pop();

      function drawArm() {
        const armThickness = 22, armLength = 46;
        push();
          strokeWeight(armThickness);
          line(0, 0, 0, armLength);
        pop();
      }
    }
  }
}

// Note that according to Translate()'s reference:
// "If translate() is called within draw(),
//  the transformation is reset when the loop begins again.""
// And it seems to get reset even after called in setup(), too.
// WARNING: HOWEVER, if you used noLoop() and use redraw() to draw,
//          it seems like it won't reset!!!
function draw() {
  push()
  clear();
  resetMatrix();

  translate(winMidX, winMidY);
  imageCentered(androidLogo, 0, 0);
  drawAndroid();

  pop();
}

function imageCentered(img, x, y) {
  image(img, x - img.width / 2, y - img.height / 2);
}

function windowResized() {
  resizeCanvas(windowHeight, windowWidth);
}