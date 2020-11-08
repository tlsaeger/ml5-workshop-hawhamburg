function setup() {
  createCanvas(800, 800);
  fill(random(0,255),random(0,255), random(0,255))
}

function draw() {
  noStroke()
  ellipse(mouseX, mouseY, 50, 50)
  mouseClickeFunction();
}

function mouseClickeFunction(){
if (mouseIsPressed){
  fill(random(0,255),random(0,255), random(0,255));
}
};