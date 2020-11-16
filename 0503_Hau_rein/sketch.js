let classifier;
let brbImage;
let video;
let poseNet;
let pose;

let img;
let modelUrl = "https://teachablemachine.withgoogle.com/models/mJ6wps9j0/" + "model.json";
let label;
let flippedVideo;
let kruemel;
let vid;

function preload() {
  classifier = ml5.imageClassifier(modelUrl);
  kruemel = loadImage('images/kruemel.png');
  brbImage = loadImage('images/loeffel.png');
}


function setup() {


  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);

  poseNet.on('pose', gotPoses);
  classifyVideo();
  textFont("Montserrat");


}


function classifyVideo() {

  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResults);
}


function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  console.log(results);
  classifyVideo();
}

function draw() {


  image(flippedVideo, 0, 0);
  showGesture();

  if (pose) {

    rightEarX = pose.rightEar.x,
      rightEarY = pose.rightEar.y;
    fill(234, 30, 49);
    image(brbImage, rightEarX - 90, rightEarY, 160, 160);
    noStroke();
  } /*blende image bei der Position vom  rechten Ohr ein*/

}

function modelLoaded() {

  createDiv("model geladen");
}

function gotPoses(results) {
  console.log(results);
  if (results.length > 0) {

    pose = results[0].pose;
  }
}


function showGesture() {

  if (label == "satt") {
    textSize(32);
    fill(250);
    text("Iss' was!", 50, 120, width, height);
  } /*wenn die class satt von teachable machine erkannt wird, schreibe "iss was"*/



  if (label == "hungrig") {
    textSize(32);
    fill(250);
    text("lecker!", 50, 120, width, height);
    image(kruemel, 0, 0, width, height);
  } /*wenn die class hungrig von teachable machine erkannt wird, schreibe "lecker!" und blende image ein*/

}