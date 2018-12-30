var FLAG = -1;
function TEST(subject) {
	push();
	noStroke();
	var c = random(255);
	fill(c);
	rect(0, 0, 200, 100);
	fill(255 - c);
	text(subject.toString(), 0, 100);
	pop();
}
const paletteSize = 230,
	  colorCircleWidth = 15,
	  SBSize = 120,
	  ctrlAreaW = 300,
	  margin = 20,
	  lineHeight = 20,
	  sliderHeight = 30,
	  colorSize = 30;
	  
function calcHue(x, y) {
	var hue;
	if (x == 0)
		if (y > 0)
			hue = 90;
		else if (y < 0)
			hue = 270;
		else 
			return -1; //Impossible
	else {
		hue = atan2(y, x);
		if (hue < 0) hue += PI * 2;
		hue = hue * 180 / PI;
	}
	return hue;
}

var palette;
function preload() {
    palette = createGraphics(paletteSize, paletteSize);
    palette.push();
    palette.colorMode(HSB, 360, SBSize, SBSize);
	var half = paletteSize / 2;
	palette.translate(half, half);
	palette.noFill();
	for (var i = -half; i <= half; i++)
		for (var j = -half; j <= half; j++)
			if (half - colorCircleWidth <= dist(i, j, 0, 0) &&
				dist(i, j, 0, 0) <= half) {
				palette.stroke(calcHue(i, j), SBSize, SBSize);
				palette.point(i, j);
			}
    palette.pop();
}

var canvasL, canvasR, canvasT, canvasB;
var panelL, panelR, panelT, panelB, panelC;
var squareL, squareR, squareT, squareB;
function setup() {
	frameRate(300);
    createCanvas(windowWidth - 20, windowHeight - 20);
    canvasL = 0; canvasR = width - ctrlAreaW - 1;
    canvasT = 0; canvasB = height;

    push();
	translate(width - ctrlAreaW, 0);
	var divWidth = ctrlAreaW,
		divHeight = 0;
    fill(30);
    noStroke();
    rect(0, 0, divWidth, height);
    {
        push();
		translate(margin, margin);
		divWidth -= margin * 2;
		divHeight += margin;
        fill(43);
        rect(0, 0, divWidth, 670);
        {
            push();
			translate(margin, margin);
			divWidth -= margin * 2;
			divHeight += margin;
			
			translate(0, lineHeight);
			divHeight += lineHeight;
            fill(220);
            textStyle(BOLD);
            textSize(25);
            text('Edit Colors', 0, 0);
			
			
			translate(0, margin);
			divHeight += margin;
            image(palette, (divWidth - paletteSize) / 2, 0);
			panelXmid = width - ctrlAreaW / 2;
			panelL = panelXmid - paletteSize / 2; panelR = panelXmid + paletteSize / 2;
			panelT = divHeight; panelB = panelT + paletteSize;
			panelYmid = (panelT + panelB) / 2;
			translate(0, paletteSize);
			divHeight += paletteSize;

			translate(0, lineHeight+10);
			divHeight += lineHeight+10;
            textStyle(NORMAL);
            textSize(18);
            text('Alpha:', 0, 0);
			translate(0, 5);
			divHeight += 5;
            ASlider = createSlider(0, 255, 255);
            ASlider.position(width  - (ctrlAreaW - divWidth) / 2 - divWidth, divHeight);
			translate(0, sliderHeight);
			divHeight += sliderHeight;
            
			translate(0, lineHeight);
			divHeight += lineHeight;
            text('Width:', 0, 0);
			translate(0, 5);
			divHeight += 5;
            WSlider = createSlider(1, 70, 15);
            WSlider.position(width  - (ctrlAreaW - divWidth) / 2 - divWidth, divHeight);
			translate(0, sliderHeight);
			divHeight += sliderHeight;
			
			translate(0, 200);
			divHeight += 200;
			text('Author:', 0, 0);
			translate(0, lineHeight);
			divHeight += lineHeight;
			textSize(14);
			text('Jay Chu, DigitalMediaTech 1501.', 0, 0);
			
            pop();
        }
		divHeight += margin;
		//TEST(divHeight);
        pop();
    }
    pop();
	squareL = panelXmid - SBSize / 2; squareR = panelXmid + SBSize / 2;
	squareT = panelYmid - SBSize / 2; squareB = panelYmid + SBSize / 2;
}

var curH, curS, curB;
var mouseArea = -1;
function draw() {
	switch(mouseArea) {
	case 1:
		updateSB();
		break;
	case 2:
		updateColor();
		break;
	case 3:
		paint();
		break;
	default:
		;
	}
}

function updateSB() {
	curH = calcHue(mouseX - panelXmid, mouseY - panelYmid);
	push();
	translate(panelL + (paletteSize - SBSize) / 2, 
			  panelT + (paletteSize - SBSize) / 2);
	noFill();
	colorMode(HSB, 360, SBSize, SBSize);
	for (var S = 0; S < SBSize; S++)
		for (var B = 0; B < SBSize; B++) {
			stroke(curH, S, B);
			point(S, SBSize - B);
		}
	pop();
}

function updateColor() {
    if (squareL <= mouseX && mouseX <= squareR &&
        squareT <= mouseY && mouseY <= squareB) {
		curS = mouseX - squareL;
		curB = squareB - mouseY;
		push();
		colorMode(HSB, 360, SBSize, SBSize);
		noStroke();
		fill(curH, curS, curB);
		rect(width - margin * 2 - colorSize, margin * 2, colorSize, colorSize);
		pop();
    }
}

var lastX = -1, lastY = -1, curX, curY;
function paint() {
	push();
	colorMode(HSB, 360, SBSize, SBSize, 255);
	stroke(curH, curS, curB, ASlider.value());
	strokeWeight(WSlider.value());
	if (lastX == -1 && lastY == -1) {
		point(mouseX, mouseY);
	} else
		line(lastX, lastY, mouseX, mouseY);
	lastX = mouseX; lastY = mouseY;
	pop();
}

function mousePressed() {
	var d = dist(mouseX, mouseY, panelXmid, panelYmid);
    if (paletteSize / 2 - colorCircleWidth <= d && d <= paletteSize / 2)
		mouseArea = 1;
    if (squareL <= mouseX && mouseX <= squareR &&
        squareT <= mouseY && mouseY <= squareB)
		mouseArea = 2;
    if (canvasL <= mouseX && mouseX <= canvasR &&
        canvasT <= mouseY && mouseY <= canvasB)
		mouseArea = 3;
}

function mouseReleased() {
	mouseArea = -1;
	lastX = -1;
	lastY = -1;
}
