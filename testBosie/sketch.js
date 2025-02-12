let points = [[50, 100], [200, 300], [350, 100], [100, 200]];
points.push([100, 200]);
;
let selectedPoint = -1;
let savePointsKey = 83; // "S"
let loadPointsKey = 76; // "L"

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  drawControlPoints();
  drawBezierCurve();
}

function drawControlPoints() {
  noFill();
  stroke(0);
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i][0], points[i][1]);
  }
  endShape();
  
  for (let i = 0; i < points.length; i++) {
    if (dist(mouseX, mouseY, points[i][0], points[i][1]) < 5) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    ellipse(points[i][0], points[i][1], 10, 10);
  }
}

function drawBezierCurve() {
  noFill();
  stroke(255, 0, 0);
  strokeWeight(3);
  beginShape();
  for (let t = 0; t <= 1; t += 0.01) {
    let x = bezierPoint(points[0][0], points[1][0], points[2][0], t);
    let y = bezierPoint(points[0][1], points[1][1], points[2][1], t);
    vertex(x, y);
  }
  endShape();
}

function bezierPoint(a, b, c, t) {
  let t2 = t * t;
  let t3 = t2 * t;
  let mt = 1 - t;
  let mt2 = mt * mt;
  let mt3 = mt2 * mt;
  return a * mt3 + 3 * b * mt2 * t + 3 * c * mt * t2 + c * t3;
}

function mousePressed() {
  for (let i = 0; i < points.length; i++) {
    if (dist(mouseX, mouseY, points[i][0], points[i][1]) < 5) {
      selectedPoint = i;
    }
  }
}

function mouseDragged() {
  if (selectedPoint >= 0) {
    points[selectedPoint][0] = mouseX;
    points[selectedPoint][1] = mouseY;
  }
}

function mouseReleased() {
  selectedPoint = -1;
}

function keyPressed() {
  if (keyCode === savePointsKey) {
    savePoints();
  } else if (keyCode === loadPointsKey) {
    loadPoints();
  }
}

function savePoints() {
  let data = JSON.stringify(points);
  localStorage.setItem("bezierPoints", data);
}

function loadPoints() {
  let data = localStorage.getItem("bezierPoints");
  if (data) {
    points = JSON.parse(data);
  }
}
