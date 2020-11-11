

// Classifier Variable
let classifier;
let brbImage;
let tommyImage;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/e_YE7eCAp/' + 'model.json';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
  brbImage = loadImage('img/brb.png');
  tommyImage = loadImage('img/tommy.png');
}

function setup() {
  createCanvas(320*3, 260*3);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

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
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function showGesture(){
  //console.log(label)
  if(label == "Tommy"){
    image(tommyImage,0,0);
  }
  else if(label == "Nichts"){
    image(brbImage,0,0);
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
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}