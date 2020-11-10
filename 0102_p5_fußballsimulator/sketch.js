/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de  */

/* In diesem Beispiel wollen wir ein kleinen Fußballsimulator bauen. 
Dazu brauchen wir: 
Ein Spielfeld 
Einen Ball 
Ein Tor 
Einen Schiedsrichter (der das Tor geben kann) 
*/

/* Wir beginnen damit ein paar Variablen zu definieren. Diese können wir später einsetzen, damit wir nicht so viel tippen müssen. 
Zu erst erstellen wir eine Varibale für die breite und eine für die Höhe unserer Spielfeldes, dann noch eine die später
unser Bild des Fußballs beinhalten wird.  */
let canvasWidth = 800;
let canvasHeight = 400;
let img;

/* Wie schon im Beispiel zuvor, erstellen wir in der setup() Funktion unseren Canvas, diese mal nicht mit festen Werten, 
sondern mit den Werten aus unserern Variablen.  
Außerdem laden wir das Bild in die Variable img, dazu geben wir einfach an, wo sich das Bild relativ zu unserer aktuellen 
Datei befindet. Also im Ordner asstets und heißt dann fußball.png mit einen Schrägstrich navigiert man in den Ordner. */
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  img = loadImage('assets/fussball.png');
};

/* Im der draw() Funktion zeichnen wir zuerst einen Hintergrund (background), dieser erwartet genauso wie fill() im
Beispiel zuvor 3 Parameter, RGB, Rot, Grün, Blau. Wir setzten diesen auf Rot: 0, Grün 255, also das höchste was geht und 
blau: 0. Somit haben wir ein schönes sattes grün für unserer Fußballplatz.
Als nächstes setzen wir den rectMode auf CENTER. Wenn wir ein Rechteck zeichenen geben wir auch hier wie bei 
der Ellipse zuvor X und Y-Position an. Diese Position ist im Standard aber nicht die Mitte der Form, 
die wir zeichnen, sondern die obere linke Ecke. Wir setzten dies jetzt auf die Mitte des Rechtecks. Als nächstes 
setzten wir wir die mit fill(255), die Farbe auf weiß, dies wird unser Tor. Seht ihr, dass wir hier nur einen Parameter, 255,
angegben haben? Wenn wir eine Farbe aus dem Spektrum Grautonspektrum haben wollen, reicht auch ein Parameter.
Als nächstes zeichnen wir das Rechteck, unser Tor. Wir wollen dieses am Ende des Spielfelds platzieren, also können wir 
unsere Variable wiederverwenden, canvasWidth. Bei der Höhe soll das ganze natürlich mittig auf dem Spielfeld sein, 
weshalb wir unserer Variblae für die Höhe einfach durch 2 teilen. Die Breite und Höhe das Tors setzen wir einfach 
auf 100 Pixel. 
Als nächstes wollen wir noch die Mittelline erstellen. Dafür können wir eine Linie verwenden. Diese wird nicht gefüllt, 
sondern die Konturfarbe wird angegeben. Dies tun wir mit stroke(255) also eine weiße Linie. Nun positionieren wir die Linie, 
mittig auf dem Canvas.  
Jetzt fehlt nur noch unser Ball, wir geben erstmal an, dass auch dieser seine X/Y-Postion im CENTER haben soll. 
Dann erstellen wir den Ball, zu erst braucht dieser natürlich das Bild, dies geben wir ihm über die Variable img, danach wird das ganze postioniert. Wir wollen natürlich, dass der Ball unserer Maus folgt, deshlab wird X/Y wieder die Position der Maus. 
Die Größe des Balls, definieren wir mit 50x50 Pixeln. 
Jetzt haben wir unser Spielfeld und ein Tor, sowie den Ball gebaut, fehlt nur noch der Schiri, der das Tor gibt. 
Dafür bauen wir uns wieder eine eigene Funktion mit dem Namen goal().*/
function draw() {
  background(0,255,0);
  rectMode(CENTER);
  fill(255);
  rect(canvasWidth,canvasHeight/2,100,100)
  stroke(255);
  line(canvasWidth/2,0,canvasWidth/2,canvasHeight)
  imageMode(CENTER);
  image(img, mouseX,mouseY, 50, 50);

  goal();
}

/* Unser Schiedsrichter, soll entscheiden, ob wir ein Tor geschoßen haben oder nicht. Dafür verwenden wir wieder eine 
if-Funktion. Dieses mal ist die Funktion etwas komplexer, zu erst frage wir ist mouseX größer(>) als unser Canvas -1. 
Also gerade so über die Torline. Wenn wir jetzt aufhören würden, wäre aber jedes Seitenaus auch ein Tor. 
Deshalb müssen wir das Tor noch etwas weiter definieren. Wir schreiben && um klar zu machen, dass das nächste Argument
auch zutreffen muss. Wir sagen ist die Y-Position der Maus größer als die Hälfte des Canvas, das wäre die Mitte unseres Tors, 
-50 Pixel, die Hälfte der größe unsereres Tors. Somit haben wir den oberen Pfosten. Aber alles was jetzte unten am Tor
vorbeigeht, soll ja nicht versehentlich als Tor gezählt, deshalb schreiben wir wieder && und den Y-Wert der Maus, 
soll kleiner sein als die Höhe des Canvas + 50 Pixel. 
Jetzt müssen wir nur noch definieren, was passieren soll, wenn ein Tor fällt. Natürlch wollen wir einen Nachricht 'GOOOOOOOAL', 
schreiben. Wir setzen die Textgröße auf 32 Pixel, geben der Schrift einen schöne blaue Füllfarbe und Postionieren die 
Schrift mittig. Dann definieren wir mit text() unserer Text als 'GOOOOOOOOOAL!', und postionieren dieses in 
der Mitte des Canvas.
Happy Footballing!
*/
function goal(){
if (mouseX > canvasWidth - 1 && mouseY > canvasHeight/2 - 50 && mouseY < canvasHeight/2 + 50){
  textSize(32);
  textAlign(CENTER);
  text('GOOOOOOOOOAL!',canvasWidth/2,canvasHeight/2);
}
}