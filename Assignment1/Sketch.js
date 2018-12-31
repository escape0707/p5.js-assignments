/// <reference path="../TypeScript/p5.global-mode.d.ts" />
// var foobar2000Logo, androidLogo;
var androidColor = "#0000ff"; // Changed to blue since red might be too frightening...
var gui;
// var x = 0, y = 0, z = 0, a = 0, b = 0, c = 0;

// function preload() {
//   foobar2000Logo = loadImage("Foobar 2000 Logo.png");
//   androidLogo = loadImage("Android Logo.png");
// }

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');

  // gui = createGui('Temporary Variables');
  // sliderRange(-100, 100, 1);
  // gui.addGlobals('androidColor');
  // gui.addGlobals('x', 'y', 'z', 'a', 'b', 'c');
  // noLoop();
}

function drawAndroid() {
  // let debugColor = color(androidColor);
  // debugColor.setAlpha(150);
  push();
    fill(androidColor);
    stroke(androidColor);
    const deltaX = 0, deltaY = -29;
    translate(deltaX, deltaY);
    drawBody();
  pop();

  function drawBody() {
    const bodyWidth = 97, bodyHeight = 83, cornerRadius = 12, neckHeight = 4;
    push();
      noStroke();
      rect(-bodyWidth / 2, 0, bodyWidth, bodyHeight, 0, 0, cornerRadius, cornerRadius);
    pop();
    drawArms();
    push();
      translate(0, bodyHeight);
      drawLegs();
    pop();
    push();
      translate(0, -neckHeight);
      drawHead();
    pop();

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

    // Interseting: This part dividing method may have one-pixel line drawed twice on the joining age?
    // Can't figure out visually during prototyping phase. So, maybe "never mind it"...
    function drawLegs() {
      const hipWidth = 36;
      push();
        translate(hipWidth / 2, 0);
        drawLeg();
      pop();
      push();
        translate(-hipWidth / 2, 0);
        drawLeg();
      pop();

      function drawLeg() {
        const legLength = 24, legThickness = 22;
        push();
          strokeCap(SQUARE);
          strokeWeight(legThickness);
          line(0, 0, 0, legLength);
          /* drawFoot() */ {
            noStroke()
            arc(0, legLength, legThickness, legThickness, 0, PI);
          }
        pop();
      }
    }

    function drawHead() {
      const headHeight = 91;
      push();
        noStroke();
        arc(0, 0, bodyWidth, headHeight, PI, TWO_PI);
      pop();
      drawEyes();
      drawAntennas();

      function drawEyes() {
        const eyeDistance = 23, eyePosY = -22;
        push();
          translate(eyeDistance, eyePosY);
          drawEye();
        pop();
        push();
          translate(-eyeDistance, eyePosY);
          drawEye();
        pop();

        function drawEye() {
          const eyeSize = 8;
          push();
            stroke('white');
            strokeWeight(eyeSize);
            point(0, 0);
          pop();
        }
      }

      function drawAntennas() {
        const antennaX = 23, antennaY = -40;
        push();
          translate(antennaX, antennaY);
          drawAntenna(false);
        pop();
        push();
          translate(-antennaX, antennaY);
          drawAntenna(true);
        pop();

        function drawAntenna(isRightSideAntenna) {
          const antennaDeltaX = 7, antennaDeltaY = -14, antennaWidth = 4;
          push();
            strokeWeight(antennaWidth);
            line(0, 0, isRightSideAntenna ? -antennaDeltaX : antennaDeltaX, antennaDeltaY);
          pop();
        }
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

  translate(width / 2, height / 2);
  // imageCentered(androidLogo, 0, 0);
  drawAndroid();

  pop();
}

// function imageCentered(img, x, y) {
//   image(img, x - img.width / 2, y - img.height / 2);
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
