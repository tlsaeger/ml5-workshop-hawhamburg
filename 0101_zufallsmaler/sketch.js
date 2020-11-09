/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de  */

/* Bei p5.js gibt finden wir immer diesen Standardaufbau: 
function setup(){
Hier steht dann irgendwas
};
function draw(){
Hier steht dann irgendwas
};

Es beginnt mit der Funktion setup()
alles was wir hier definieren wird nur einmal ausgeführt. In unserem Fall geben wir hier an, 
dass wir einen Canvas mit der Größe 800x800 Pixel erstellen wollen. Außerdem setzen wir die 
Füllfarbe für alle Formen die wir zeichen erstmal in seinen drei Werten RGB, also Rot, Grün, Blau jeweils auf Zufall. 
Außerdem sagen wir mit noStroke(), dass unsere Form keine Kontur haben sollen. 
*/
function setup() {
  createCanvas(800, 800);
  // fill(random(0,255),random(0,255), random(0,255));
  fill(0,0,255);
  noStroke()
}
/* Auch ein Teil des Standardaufbaus, ist die Funktion draw(), alles was hier passiert wird immer wieder ausgeführt.
Hier erstellen wir eine Ellipse, diese erwartet von uns 4 Paramater. Die X-Position, sowie die Y-Position auf unserem Canvas.
Die Breite, sowie die Höhe der Ellipse. In unserem Beispiel sagen wir die X- und Y-Position, sollen X- und Y-Position der 
Maus sein. Und die Breite und Höhe legen wir auf 50 Pixel fest, einfach aus Spaß.
Das zweite was in dieser Funktion passiert, ist das eine weitere Funktion ausgeführt werden soll, mouseClickFunction(). 
Die definieren wir selber im nächsten Block.
*/
function draw() {
  ellipse(mouseX, mouseY, 50, 50);
  mouseClickFunction();
}
/* Die Funktion mouseClickFunction(), die uns eben schon im anderen Block begegnet ist, definieren wir hier.
Wir machen hier eine sogennate if-Abfrage. Also ein Wenn das der Fall ist dann mach das und das. 
Wenn meine Maus in der linken oberen Ecke ist, mach den Hintergrund blau. In unserem Beispiel fragen wir einfach, 
Wenn die Maus gedrückt/geklickt wird, dann tu etwas. 
Das etwas sehen wir dann auf der nächsten Zeile, wir setzten die Füllfarbe wieder auf einen neuen Zufallswert, wie schon 
in der setup() Funktion. 
   */
function mouseClickFunction(){
if (mouseIsPressed){
  fill(random(0,255),random(0,255), random(0,255));
}
};