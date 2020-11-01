let canvasWidth = 800;
let canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0,255,0);
  rectMode(CENTER);
  fill(255)
  rect(canvasWidth,canvasHeight/2,100,100)
  stroke(255);
  line(canvasWidth/2,0,canvasWidth/2,canvasHeight)
  fill(0,0,255)
  noStroke()
  ellipse(mouseX,mouseY,25,25)
  
  goal()
}

function goal(){
if (mouseX > canvasWidth - 1 && mouseY > canvasHeight/2 - 50 && mouseY < canvasHeight/2 + 50){
  textSize(32);
  textAlign(CENTER);
  text('GOOOOOOOOOAL!',canvasWidth/2,canvasHeight/2);
}
}