/* ml5.js Workshop 
HAW Hamburg Department Design 9.11.-13.11.2020 
von Tom-Lucas Säger tlsaeger.de  */

/* ACHTUNG! Zuvor haben wir immer die Extenstion p5.vscode verwendet um unser 
p5 Projekt zu starten und später die ml5 library zu laden. 
Die Version, die in dieser Extenstion bereitgestellt werden entsprechen nicht der 
richtigen Version und beeinhalten einige Funktionen nicht, die wir heute brauchen. 
Deshalb betten wir ml5 direkt über einen Link ein. 
Füge dazu der index.html unter diesen zwei Zeilen: 
    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
Folgenden hinzu: 
    <script src="https://unpkg.com/ml5@0.4.2/dist/ml5.min.js"></script>
Wenn du die Datei heruntergeladen hast, hab ich das schon gemacht. 
*/

/* In diesem Beispiel erstellen und trainieren wir unser eigenes Neuronales 
Netzwerk. Wir bauen drei Schritte. Schritt 1: Trainingsdaten sammeln. 
Schritt 2: Netzwerk trainieren. Schritt 3: Neuen Input Klassifiziern lassen. 
Wir klicken auf den Canvas und erstellen so Datenpunkte mit unterschiedlichen 
Buchstaben, unseren späteren Labels.*/

/* Wir erstellen uns wieder ein paar Variablen, die erste enthält unser Model
targetLabel ist unser Standard für das Label. In der Variable state setzten wir
den aktuellen Status (sammeln, trainieren, klassifiziern). Die Letzte nutzen wi für 
einen Button.*/

let model;
let targetLabel = "C"
let state = 'sammeln'
let button;

/* Wir zeichen unseren Canvas, geben diesem eine Hintergrundfarbe. */
function setup() {
    createCanvas(600, 600);
    background(255, 200, 200);
    /* Hier erstellen wir einen Button mit dem Titel "START TRAINING", wenn 
    wir genug Daten gesammelt haben, wollen wir diesen klicken und das Training starten.
    Dazu fügen wir über button.mousePressed() die Funktion buttonPress hinzu, 
    die dann das Training übernimmt. */
    button = createButton("START TRAINING");
    button.mousePressed(buttonPress)
    /* Für unser neuronales Netzwerk brauchen wir ein paar Optionen, 
    die wir wie in der Referenze von ml5.js über ein Objekt options definieren. 
    Wir geben an, welche Inputs wir eingeben. Also x und y Postion unsere Datenpunkte.
    Dann geben wir an, dass wir am Ende ein Label rausbekommen wollen.
    Als task wählen wir "classification" als 2. Möglichkeit gäbe es noch "regression".
    Mit debug: 'true' können wir uns während des Trainings Daten ausgeben lassen.*/
    let options = {
        inputs: ["x", "y"],
        outputs: ["label"],
        task: "classification",
        debug: 'true'
    }
    /* Wir erstellen unser Model und geben diesem unser option Object mit. */
    model = ml5.neuralNetwork(options);
}
/* Die nächste Funktion wird ausgeführt wenn wir klicken. Sie bildet das Herzstück 
unserers Programms und wir schreiben hier auch Befehle für einen späteren Zeitpunkt des Programms
lasst euch davon nicht verwirren. */

/* Zu erst erstellen wir unsere Funktion und sagen jedes Mal wenn geklickt wird, 
speicher die x und y postion der Maus in das Object inputs.  */
function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY,
    }
    /* Jetzt fragen wir erstmal ab in welchem Status wir uns befinden, der erste Status ist 
    "sammeln", ist dieser gesetzt, fangen wir unser targetLabel ab. Dies haben wir am Anfang 
    auf "C" gesetzt und zum jetzigen Zeitpunkt auch noch nicht geändert.  */
    if (state == 'sammeln') {
        let target = {
            label: targetLabel
        }
        /* Indem wir die Funktion addData auf unser Model anweden, übergeben wir die Daten, die
        wir gesammelt haben an unser Model. Einmal die inputs, also mouseX und mouseY,
        sowie das label (target).    */
        model.addData(inputs, target);
        /* Um auch sehen zu sehen zu können was wir da klicken, zeichnen wir 
        an dem Punkt wo wir klicken einen Kreis, mit einer grünen Kontur, 
        ohne Füllfarbe. An die mouseX und mouseY Koordinate mit einem Höhe/Breite
        von 25px  */
        stroke(0, 200, 0);
        noFill();
        ellipse(mouseX, mouseY, 25);
        /* Als nächstes wollen wir unser Label ausgeben, auch das soll grün sein, 
        keine Kontur und horizontal sowie vertikal zentriert sein. 
        Dann müssen wir den Text definieren, den ziehen wir einfach aus unserem targetLabel, 
        als Koordinaten verwenden wir einfach wieder die Maus Position. */
        fill(0, 200, 0)
        noStroke();
        textAlign(CENTER, CENTER)
        text(targetLabel, mouseX, mouseY);
    }
    /* Dieser Teil wird ausgeführt, wenn das Training abgeschlossen ist keine 
    Datenpunkte mehr sammeln, sondern die neuen Klicks klassifizieren wollen. 
    Wir geben der Funktion classify() deshalb unsere unsere inputs, also Maus Koordinaten,
    mit und definieren einen Callback gotResults()*/
    else if (state == "klassifizieren") {
        model.classify(inputs, gotResults);
    }
}
/* Wir wollen ja nicht jeder Koordinate das Label "C" geben, sondern über die Tastatur
neue Buchstaben definieren. Die untere Funktion wird immer aufgerufen, wenn wir eine
Taste drücken. Dann setzen wir unsere Variable targeLabel auf den key den wir gedrückt haben. 
Da wir uns nicht darum kümmern wollen ob der key jetzt groß oder klein geschrieben 
ist, machen wir den einfach immer groß, mit der Funktion toUpperCase().
Schauen wir jetzt nochmal in die Funktion mousePressed fängt es auch da an Sinn zu machen. */
function keyPressed() {
    targetLabel = key.toUpperCase();
}

/* Im Setup haben auch einen Button erstellt, der soll das Training starten. 
Die Funktion bauen wir hier. Wird der Button also geklicktsetzen wir unseren 
Status auf 'training' und erstellen uns ein DIV, das sagt wir starten das Training.
*/
function buttonPress() {
    state = 'training'
    createDiv("Training startet")
    /* Wir normalisieren die Daten, das übernimmt ml5 für uns wenn wir das
    ganze wie unten aufrufen. Die Daten werden so vorbereitet, dass unser Netzwerk 
    damit arbeiten kann.  */
    model.normalizeData();
    /* Wir erstellen uns wieder ein options Object ähnlich wie wir es oben getan haben. 
    Hier definieren wir die Anzahl der Epochs, also der Durchgänge, wie oft das Netzwerk 
    sich die Daten anschauen soll. Zu guter Letzt starten wir das Training, 
    geben dem Model die eben definierten options mit, und erstellen 
    dieses Mal zwei Callbacks, einden der während des Trainins ausgeführt wird. 
    Einen wenn das Training beendet wird.*/
    let options = {
        epochs: 200
    }
    model.train(options, whileTraining, finshedTraining);
}
/* Wir definieren unserern ersten Calback und loggen uns den aktuellen Epoch und den 
so gennaten Loss, dieser soll möglich gering sein. So wissen wir, dass das Model gut
trainiert wurde. Wir loggen so 200 Datenpunkte in unserer Konsole.
Da wir ganz oben debug auf true gesetzt haben. Bekommen wir noch eine coole Grafik.
Die uns den Loss über die einzelen Epochs anzeigt.*/
function whileTraining(epoch, loss) {
    console.log(epoch);
    console.log(loss);
}
/* Ist das Netz fertig mit dem Trainig gibt es uns über die Konsole bescheid 
und ändert den state von 'training' in 'klassifizieren' 
Das wiederum bewirkt, dass wenn wir jetzt klicken in der Funktion mousePressd()
nicht der erste if-Block ausgeführt wird, sondern der zweite. 
Dieser klassifiziert den Input und löst den den Callback gotResults aus.*/
function finshedTraining() {
    console.log("Fertig mit Training!")
    state = 'klassifizieren'
}
/* Wie oben beschrieben, wird dieser Callback erst ausgelöst, 
wenn der state auf 'klassifizieren' steht. Wir loggen erstmal wieder unseren 
Error sollte einer bestehen. */
function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    /* Wir haben ja gerade wieder geklickt um diese Funktion überhaupt auszulösen und 
    wollen jetzt wieder einen Kreis zeichen, nur geben wir dieses Mal nicht das Label an, 
    das soll uns das Neuronal Netzwerk geben.
    Wir stylen unsere Ellipse ähnlich wie vorhin nur dieses Mal in blau. */
    stroke(0,0,255);
    /* Der 4. Wert in dieser fill Funtkion gibt den Alpha-Wert, also die Transparenz an. */
    fill(0, 0, 255, 100);
    ellipse(mouseX, mouseY, 25);
    fill(0,0,255)
    noStroke();
    textAlign(CENTER, CENTER)
    /* Hier wird es spanend, das Label unseres Kreises lassen wir jetzt 
    aus dem results des Neuronalen Netzwerkes generieren. Als Position nehmen 
    wir unsere Maus-Koordinaten */
    text(results[0].label, mouseX, mouseY);
}

/* Dieses Beispiel, ist stark beeinflusst von den Video zu Neuronalen 
Netzen und ml5.js vom Coding Train, weitere Infos zum Projekt findet ihr hier:
https://www.youtube.com/watch?v=8HEgeAbYphA&feature=emb_logo&ab_channel=TheCodingTrain
*/