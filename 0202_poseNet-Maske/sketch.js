/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de  */

let poseNet;
let video;
let label, lableCheck;


function preload() {
  poseNet = ml5.poseNet(video,modelReady);
  console.log(poseNet);
}

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(400,400);
  video.hide();
  classifyVideo();

}
function draw(){
console.log(lableCheck)
background(255)
image(video, 0,0);
text(label, width / 2, height -20);
if(lableCheck == 'Tommy'){
  image(robot,0,0,width, height)
}
}

function modelReady() {
  createDiv("Model ist geladen")
  console.log("Model Geladen");
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  label = 'Label: ' + results[0].label + '\n' + 'Confidence: ' + results[0].confidence;
  lableCheck = results[0].label;
  classifyVideo();

}