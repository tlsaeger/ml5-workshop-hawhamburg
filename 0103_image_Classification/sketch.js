/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de  */

/* In diesem Beispiel nutzen wir den ImageClassfier MobileNet um ein Bild zu klassifizieren. Dazu ist es wichtig, dass
in der index.html Datei nicht nur p5.js, sondern auch ml5.js geladen wird. Schau einmal nach.  */

/* Wir erstellen uns zuerst wieder ein paar Variablen. Mit classifier laden und nutzen wir unser Model, 
mit img unser Bild, das wir klassifizieren wollen. */

let classifier;
let img;

/* Diese Funktion preload() ist neu, sie wird zu erst ausgführt, noch vor setup() und draw() und ermöglicht uns, 
Dinge zu laden bevor überhaupt irgendwas angezeigt wird. Wir nutzen die Funktion um unser model zu laden. 
Dazu sprechen wir ml5 an und bitten ihn uns Zugriff auf die Funktion imageClassifier zu gewähren. 
ml5 braucht des weiteren von euch noch den Namen des Models, in unsererm Fall MobileNet, auf der Seite ml5js.org 
findet ihr aber auch weitere Modelle, in einer der nächsten Lektionen laden wir außerdem unser eigenes Model. 
Außerdem braucht ml5 von uns noch einen so gennaten Callback, also eine Funktion die ausgführt wird, wenn das Model fertig
geladen ist. Wir nennen diese modelReady und definieren sie später im Code. 
Dann laden wir ein Bild aus dem Ordner images das Bild trägt Beispielsweise den Namen bird.jpg. 
Außerdem geben wir uns über console.log() in unserer Konsole im Browser das Model noch einmal aus. 
*/
function preload() {
  classifier = ml5.imageClassifier('MobileNet', modelReady);
  img = loadImage('images/bird.jpg');
  console.log(classifier);
}
/* Hier erstellen wir jetzt unsere Callback Funktion modelReady(), diese erstellt uns einfach ein Div als ein HTML
Element auf unserer Seite, worin steht "Model ist geladen" */
function modelReady() {
  createDiv("Model ist geladen")
}

/* Im Setup erstellen wir wie gewohnt unserern Canvas. Dann wollen wir, dass unser Bild klassifierziert wird. 
Dafür geben wir dem classifier den Befehl calssify. Als Argumente geben wir ihm unser geladenens Bild mit und 
definieren wieder einen Callback mit dem Namen gotResult, dieser wird ausgeführt. Wenn das Bild klassifiziert wurde. 
Für die Machschine uninteressant, aber für uns ganz schön, wir packen das Bild, dass ml5 klassifiziert auf den Canvas. 
*/
function setup() {
  createCanvas(400, 400);
  classifier.classify(img, gotResult);
  image(img, 0, 0, 400, 400);
}

/* Jetzt definieren wir noch unserer zweite Callback Funktion gotResults(), der erste Teil 
if(error)… ist Standard und fängt einen Fehler ab, soltet dieser auftreten.
Für uns ist die Variable results interessant, darin finden wir die Ergebnisse des klassifzierens.
Wir loggen uns die Varible in unsere Konsole um mal besser reinschauen zu können. 
Der Inhalt dieser Variablen ist nicht wie sonst immer eine Zahl oder Text, sondern ein so gennantets Aaray. 
Diese enthalten nicht nur einen Wert sondern gleich mehrer. Wir wollen uns jetzt die für uns wichtigen 
raussuchen und diesen dann auch ansprechen. 
Schauen wir in der Konsole im Browser nach, sehen wir, dass dort ein Object ausgegben wurde. Dies hat 3 Einträge, 
nummeriert von 0 bis 2, klicken wir und den klein Pfeil neben der 0, sehen wir dass es hier zwei weiter Einträge gibt. 
confidence und label. In diesem Fall, des Vogel Bildes, liegt die confidence bei 0.928 und so weiter. 
ml5 ist sich als zu ca. 93% sicher das auf dem Bild ein, ja was eigentlich abgebildt ist. Das sehen wir dann unter Label, 
hier steht robin, American robin, Turdus migratorious. ml5 js ist sich also zu 93% sicher, dass es sich hierbei
um einen robin, also zu deutsch ein Rotkehlchen handelt. 
Gut aber das wolllen wir jetzt ja auch ausgeben. Dafür müssen wir diese Werte in dem Object ansprechen. Wie man 
das macht sieht man schon auf den letzten zwei Zeilen der gotResults()-Funktion. 
Zu erst wählen wir das erste Element aus dem Object also results[0] und dann den Wert für label also .label aus.
Daraus erstellen wir ein DIV also ein HTML Element und wiederholen das ganze mit dem confidence Level. Beide 
Ausgaben beschreiben wir dann noch mit 'Label: ' bzw. 'Confidence: ' */
function gotResult(error, results) {

  if (error) {
    console.error(error);
  }

  console.log(results);
  createDiv('Label: ' + results[0].label);
  createDiv('Confidence: ' + results[0].confidence);

}