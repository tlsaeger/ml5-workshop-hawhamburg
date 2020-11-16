/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de 
Corona App 2.0 von Benjamin Bertram */

let classifier;
let img1
let img2
let modelUrl = "https://teachablemachine.withgoogle.com/models/UULjH5ZIt/" + "model.json";
let video;
let flippedVideo;
let label;
let poseNet;
let pose;
let nx;
let ny;
let corona;

fetch("https://covid-19-statistics.p.rapidapi.com/reports/total?date=2020-04-07", {
  "method": "GET",
  "headers": {
    /* Insert your API KEY here */
    "x-rapidapi-key":  "MY_API_KEY",
    "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
  }
})
.then(response => response.json())
.then(data => {
    console.log(data);
   // document.getElementById("fallzahlen") = data["data"]["active"]
    corona = data["data"]["active"]
    //data = data.data.active;
})
.catch(err => {
    console.error(err);
});



function preload (){
  classifier = ml5.imageClassifier(modelUrl);
  img1 = loadImage('png/mask3.png');
  img2 = loadImage('png/ohr.png');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width,height)
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  classifyVideo();

}

function classifyVideo(){

classifier.classify(video, gotResults)
}

function gotResults(error, results){
  if (error){
    console.error(error);
    return;
  }

  console.log(results);
  classifyVideo();
label = results[0].label;
}

function draw() {
  background(255);
  image(video,0,9,width,height);
  showGesture();
}

function modelLoaded(){
  createDiv("Model geladen");
}

function showGesture(){
  if(label == "Maske auf"){
    fill(255, 255, 255);
    textSize(32)
    text("Alles Okay :)",35,100,70,80); 
  }
  else if (label == "Maske runter"){
    fill(255, 255, 255);
    textSize(15)
    text("Coronafallzahlen: " + corona,35,100,70,80); 
    imageMode(CENTER);
    image(img1,nx,ny+40,280,190);
    image(img2,earx+20,eary,90,90);
    imageMode(CORNER)
}
}

function gotPoses(results){
  if(results.length > 0){
  console.log(results);
  pose = results[0].pose;
  nx = pose.nose.x
  ny = pose.nose.y
  eary = pose.leftEar.y
  earx = pose.leftEar.x
}
}