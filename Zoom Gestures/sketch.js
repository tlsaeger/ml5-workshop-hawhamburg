// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
let helloImage;
let peaceImage;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/QwDFOIO8g/' + 'model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
  helloImage = loadImage('gesture_assets-03.png');
  peaceImage = loadImage('gesture_assets-04.png')
}

function setup() {
  createCanvas(320*3, 260*3);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  //video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0,255,0);
  // Draw the video
  image(flippedVideo, 0, 0);
  showGesture();
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function showGesture(){
  //console.log(label)
  if(label == "Hallo"){
    image(helloImage,0,0);
  }
  else if (label == "Peace"){
    image(peaceImage,0,0);
  }
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}