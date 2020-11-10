/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de  */

/* In diesem Beispiel, lassen wir durch PoseNet unser Webcam Bild erkenne und 
setzen uns eine lustige Clowns oder Rudolph Nase auf. */

/* Wir definieren ein paar Variablen die wir später verwenden können,
in poseNet laden wir unser Model, bei video unsere Webcam und in pose lesen wir später die Posen ab. */

let poseNet;
let video;
let pose;

/* In unserem Setup erstellen wir uns dieses Mal nicht nur einen Canvas, dieses Mal mit 640*480
Pixeln, sondern über createCapture(VIDEO), greifen wir auf das Webcam Bild zu. 
Mit video.size setzen wir die Größe auf unseren Canvas fest und mir video.hide() blenden wir dieses Video aus. 
Das wollen wir lieber später in draw() zeichnen. 
Außerdem laden wir poseNet in unsere neue Varibale poseNet, dies bekommt als Paramter unser video und einen Callback. 
In der nächsten Zeile sagen wir PoseNet, wenn du eine Pose erkannt hast dann führe die Callback Funktion aus. 
In dieser können wir dann später die Results auslesen. */
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide();
  poseNet = ml5.poseNet(video,modelReady);
  poseNet.on('pose', gotPoses);
}
/* In unserem ModelReady() Callback geben wir wieder eine Nachricht auf der 
Webseite aus, wenn das Model geladen ist. */
function modelReady() {
  createDiv("Model ist geladen")
  console.log("Model Geladen");
}
/* Die Funktion gotPosese enthält unsere Posen/Resultate,
da diese Funktion erstmal etwas braucht bis alles losgeht, fragen wir diese erst ab, wenn die length, 
also die Länge der Inhalte, die Einträge, größer sind als 0. Heißt im Klartext es steht etwas drin. 
Dann packen wir die Posen aus dem results Object in eine eigene Varibale. */
function gotPoses(results) {
  if(results.length > 0){
    pose = results[0].pose;
  }
}


/* Das normale Kamera Bild ist immer spiegelverkehert eingstellt, damit man besser weiß in welche 
Richtung man sich bewegen muss flippen wir mit translate() und scale() unseren Canvas. 
Dann zeichnen wir unser Webcam Video ein.  */

function draw(){
translate(width,0);
scale(-1.0,1.0);
image(video, 0,0, 640, 480);

/* Wir bleiben im Draw Loop und fragen hier nochmal ab ob die Variable pose auch einen Inhalt hat.
Ist das der Fall erstellen wir uns drei neue Variblen noseX und noseY für die X/Y-Postion der Nase 
und widthheight als Wert für die breite und Höhe unserer Nase. Diese errechnen wir uns wiederrum aus 
dem Abstand zwischen den beiden Augen, so könnnen wir die Nase etwas skalieren.*/

if (pose){
  noseX = pose.nose.x;
  noseY = pose.nose.y;
  leftEyeX = pose.leftEye.x;
  rightEyeX = pose.rightEye.x;
  widthheight = (leftEyeX - rightEyeX) * 0.75;
  console.log(widthheight);

  /* Wir geben der Nase eine schöne rote Farbe, entfernen die Kontur und setzen ihren Koordinatenursprung
  mit ellipseMode(CENTER) auf die Mitte der Ellipse. 
  Dann zeichnen wir die Ellipse, mit den vorher festgelegten X/Y Koordinaten, die uns PoseNet zurück gibt. 
  Als Breite und Höhe verwenden wir unsere dritte Variable widthheight. 
  Als nächstes erstellen wir noch einen kleinen Reflektionspunkt um unsere Nase realisitischer aussehen 
  zu lassen. Diese positionieren wir in Abhängikeit zur Hauptnase um ein Viertel der Hauptnasengröße
  nach rechts und nach oben. Die breite setzen wir ebenfalls auf ein Viertel.*/

  fill(255,0,0);
  noStroke();
  ellipseMode(CENTER);
  ellipse(noseX, noseY, widthheight,widthheight); 
  fill(230,100,10);
  ellipse(noseX-widthheight*0.25,noseY-widthheight*0.25,widthheight*0.25,widthheight*0.25)
}

}


