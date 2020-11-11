// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;
// A variable to hold the image we want to classify
let img;

let modelUrl = "https://teachablemachine.withgoogle.com/models/BssWL1D7m/";

function preload() {
  classifier = ml5.imageClassifier( modelUrl + 'model.json', modelReady);
  img = loadImage('images/Tommy.png');
  console.log(classifier);
}

function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
  image(img, 0, 0,400,400);
}

function modelReady(){
  createDiv("Model ist geladen")
  console.log("Model Geladen");
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  createDiv('Label: ' + results[0].label);
  createDiv('Confidence: ' + results[0].confidence);
  
}
