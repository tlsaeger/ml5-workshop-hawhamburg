/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de 
Klorollenkönigin von Friderike Höft */

/* selbstgeneriete Bilderkennung auf teachablemachine.withgoogle.com */
let modelUrl = "https://teachablemachine.withgoogle.com/models/gmrD42NoG/" + "model.json";
let classifier;
let video;
let label;
let pose;
let poseNet;
let eimer;
let krone;

function preload(){
  classifier = ml5.imageClassifier(modelUrl);
  eimer = loadImage("img/eimer.png");
  krone = loadImage("img/krone.png");
}
function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  classifyVideo();
  rectMode(CENTER);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}

function gotResults(error, results){
  if(error){
    console.error(error);
    return; 
  }
  label = results[0].label;
  console.log(label);
  classifyVideo();
}

function draw() {
  background(220);
  /* video "spiegeln" */
  translate(width, 0);
  scale(-1.0,1.0);
  
  image(video, 0, 0, width, height);
  showGesture();
  if(pose){
    noseX = pose.nose.x;
    noseY = pose.nose.y;

    eyeX = pose.rightEye.x;
    eyeY = pose.rightEye.y;

    earX = pose.leftEar.x;
    earY = pose.leftEar.y;

    rightEarX = pose.rightEar.x;
    rightEarY = pose.rightEar.y;

  }
}
function gotPoses(results){
  console.log(results);
  if(results.length>0){
    pose = results[0].pose;
  }
}
function modelLoaded(){
  /* createDiv("Modell geladen");*/
  }
function showGesture(){
  if(label == "king"){
    image(eimer, earX -40, earY, 40, 40);
    image(eimer, rightEarX - 10, rightEarY, 40, 40);
    image(krone, eyeX - 20, eyeY - 150, 100, 100);
  }
}
