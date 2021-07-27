/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de  */

/* In diesem Beispiel erforschen wir die Möglichkeiten von
Teachable Machine: https://teachablemachine.withgoogle.com/
Mit dieser Anwendung können wir sehr einfach unser eigenes 
ML-Model trainieren. Erstellt dafür ein neues Image Project
mit zwei Klassen auf der Webseite. In meinem Beispiel heißen die  
Klassen Tommy und BRB für Be right back. Wir machen für die Klasse 
Tommy, bitte mit eurem Namen tauschen. Fotos über die Webcam 
von euch selber. Für die Klasse BRB geht ihr aus dem Bild und
mach auch noch ein paar Bilder. Dann klicken wir auf Train 
und danach auf Export Model -> Upload. 
Daraus bekommen wir einen Link den wir hier gleich brauchen.
Wenn Teachable Machine (TM) diese Klassen später erkennt, 
soll p5.js uns ein bestimmtes Bild über den Canvas legen.
Siehe Video auf https://github.com/tlsaeger/ml5-workshop-hawhamburg#teachable-machine-videocall--0301
*/

/* Wir erstellen uns wieder ein paar Variablen, für unseren classifier, 
unsere beiden Bilder und die URL die uns TM ausgibt. Hier muss noch 
'model.json' hinzugefügt werden, damit ml5 auf die richtige Datei 
zugreift.*/
// Classifier Variable
let classifier;
let brbImage;
let tommyImage;
let mute;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/EQ1vdaXPs/' + 'model.json';

/* Wir brauche außerdem noch ein paar Variablen für unser Video und 
die Labels die wir später rausbekommen. */
let video;
let flippedVideo;
let label = "";

/* Wir laden das Model, geben diesem unsere URL von TM mit, 
heute lassen wir den Callback mal weg. Dann laden wir unsere beiden 
Bilder, wenn TM die Klassen erkennt. Diese müssen wir natürlich erstellen. 
Dafür können wir z.B. Photoshop nutzen. Am besten wählen wir die gleiche Größe wie unser Canvas also 640x480*/
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
  brbImage = loadImage('img/brb.png');
  tommyImage = loadImage('img/tommy.png');
  mute = loadImage('img/mute.png');
}
/* Im Setup erstellen wir unseren Canvas und laden über createCapture(VIDEO) die Webcam. 
Wir passen die größe mit video.size() an und hiden das ganze dann wieder.  
Als letztes starten wir unsere classifVideo() Funktion. */
function setup() {
  createCanvas(1280, 720);
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();
  classifyVideo();
}
/* In unser classifyVideo() Funktion flippen wir erstmals das Video.
Dieses Mal müssen wir die Kamera etwas anders flippen, als gestern. Unsere Methode von gestern, 
würde auch die Bilder flippen das wollen wir natürlich nicht.
Ab jetzt arbeiten wir dann mit dem flippedVideo weiter.
Wir schmeißen wieder unserern classifier an geben diesen unser flippedVideo und fangen 
über den Callback gotResults die Ergebnisse ab.*/
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

/*In unserem gotResults() Callback, definieren wir zu erst, 
was bei einem Error passieren soll. Dann speichern wir uns wie in den Beispielen zuvor, 
die results in die Varibale label und starten den Klassifizierungsprozess mit 
der Funktion classfiyVideo() erneut.   */
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  console.log(label);
  // Classifiy again!
  classifyVideo();
}

/* In Draw zeichnen wir das geflippte Video auf unseren Canvas. 
Und führen die Funktion showGesture() aus diese definieren gleich und sie checkt, 
welche Klasse gerade von TM ausgegeben wir und zeichnet dann das ensprechende Bild.    */
function draw() {
  // background(0,255,0);
  image(flippedVideo, 0, 0);
  showGesture();
}

/* Wie weiter oben beschrieben, checken wir mit dieser Funktion, 
welche Klasse TM erkennt, über unser Label, welches wir in der gotResults() Funktion
erstellt haben. Ist die Klasse "Tommy", zeichne das Bild tommyImage, 
ist die Klasse "BRB" zeichne das brbImage. */
function showGesture(){
  if(label == "Tommy"){
    image(tommyImage,0,0, width, height);
  }
  else if(label == "BRB"){
    image(brbImage,0,0, width,height);
  }
  else if(label == "On Mute"){
    image(mute,0,0, width,height);
  }

}