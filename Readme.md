# ml5.js Workshop 
**HAW Hamburg Department Design** 09.11. – 13.11.2020

## Intro 
Im Rahmen des Kurses »Artifical Intelligence und Design > aiXdesign« beschäftigen wir uns mit der Frage, wie Künstliche Intelligenz, das Design, sowie den Beruf der Designschaffenden verändern wird. Dazu wollen wir nicht nur forschend tätig sein und schauen, was es schon gibt. Sondern auch selber mit den Möglichkeiten der Künstlichen Intelligenz im speziellen des Machine Learnings experimentieren. In insgesamt drei verschiedenen Workshops, erkunden wir unterschiedliche Tools. 
In diesem geht es um die JavaScript Library [ml5.js](https://ml5js.org). Auf dieser Seite findest du vor allem den Code der einzelnen Projekte. Dieser ist kommentiert und wird so erklärt. Um dem Code runterzuladen, klicke auf den grünen Button Code, ganz oben und dann auf Download ZIP. 

### ml5.js 
ml5.js ist eine JavaScript Library, das sich zur Aufgabe gemacht hat »Friendly Machine Learning for the Web« bereitzustellen. Mit ml5 soll es kreativen Codern einfach gemacht werden, ohne viel Vorwissen Machine Learning Modelle anzusprechen, sie zu verbessern oder zu trainieren. Es sind einige Grundlagen in JavaScript nötig, die wir zu Beginn des Workshops anreißen werden. 
ml5 basiert dabei auf einer anderer Library mit dem Namen [p5.js](https://p5js.org), welches im Department Design schon häufig in unterschiedlichsten Projekten zum Einsatz kam. Es richtet sich ähnlich wie ml5.js an Kreative, die keine großen Vorerfahrungen mit Code haben, aber trotzdem digitale Projekte umsetzen wollen. 
Das tolle an beiden Librarys, ist das sie einfach direkt im Browser laufen und beide nicht viel Software brauchen. Es reicht ein Code Editor um direkt loszulegen. 
Viele Beispiele basieren in diesem Workshop auf den Projekten von [Dan Shiffmann](https://shiffman.net) besonders seine YouTube Reihe über ml5.js sei hier erwähnt: [Link](https://www.youtube.com/watch?v=26uABexmOX4&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=1)

## Getting Started
Willkommen zu Tag 1, wir wollen heute loslegen, indem wir uns das nötige Setup einrichten und verstehen was wir alles brauchen. 

### Setup

#### Einkaufsliste 
* Code-Editor 
* Browser
* Link zu p5.js & ml5.js

#### Code-Editor
Für das Programmieren kann jeder Code-Editor der Welt genutzt werden, es könnte sogar alles in TextEdit oder Word programmiert werden. 
Ein guter Code-Editor gibt uns allerdings zugriff auf viele vereinfachende Funktionen. Ich nutze für diesen Workshop den Editor **Visual Studio Code** von Microsoft. Dieser ist weiterverbreitet und es gibt eine große Anzahl an Extensions, die wir nutzen können um uns das Leben noch einfacher zu machen. 

Visual Studio Code könnt ihr hier kostenlos für euer Betriebssystem herunterladen: [Link](https://code.visualstudio.com/download)

#### Browser 
Als nächstes braucht ihr einen Browser, hier funktioniert eigentlich alles was Up-to-Date ist. Es macht auch immer mal Sinn Sachen in unterschiedlichen Browsern auszuprobieren, deshalb empfehle ich, dass ihr mindestens entweder [Chrome](https://www.google.com/chrome/) oder [Firefox](https://www.mozilla.org/de/firefox/new/) habt.

#### Link zu p5.js & ml5.js
Um p5.js bzw. ml5.js nutzen zu können, müssen wir nichts weiter herunterladen. Wir müssen diese nur in unser Projekt verlinken. Wir machen es uns aber noch einfacher, denn Visual Studio Code bietet sogar eine p5.js Extension an, diese beinhaltet auch ml5.js. 
Dazu öffnen wir Visual Studio Code und klicken in der linken Spalte auf die vier Quadrate(1.), in das Suchfeld tippen wir »p5.js«(2.). Öffnet die Extension p5.vscode von Sam Lavigne und klickt Install(3.) Jetzt haben wir alles was wir brauchen! 
![Download p5.js Extenstion](/readme_assets/download_p5_extenstion.png) 

Wie schon erwähnt basiert ml5.js auf p5.js. Deshalb wollen wir uns dies zu erst anschauen, um dort die Grundlagen kennenzulernen. 
Um in Visual Studio eine installierte Extension zu nutzen, müssen wir die Command Palette aufrufen. Drückt dazu die Tasten `command-shift-p` auf dem Mac bzw. `ctrl-shift-p` bei Windows. In das Suchfeld tippt ihr p5.js ein. Es sollten zwei Sachen vorgeschlagen werden `Install p5.js Contributor Library`, das brauchen wir später und `Create p5.js Library` das klicken wir an. 
Jetzt öffnet sich über File-Browser, wo ihr einen neuen Ordner erstellt, in dem das Projekt liegen soll. Mit einem klick auf `Fertig` werden für euch in diesem Ordner alle wichtigen Dateien erstellt, die wir brauchen. Jetzt haben wir den Standardaufbau eines p5.js Projekts erstellt. Um auch ml5.js ansprechen zu können, öffnen wir wieder die Command Palette (Mac: `command-shift-p` Windows: `ctrl-shift-p`) und such wieder nach p5.js, dieses Mal wählen wir `Install p5.js Contributor Library` und suchen nach ml5 über Enter und dann nochmal Enter auf `Install ml5.js` installieren wir auch ml5.js. 
Um zu überprüfen ob alles geklappt hat, öffnen wir auf der linken Seite die Datei `index.html`. Wenn wir dort folgenden Code finden hat alles geklappt: 
```html  
    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
    <script src="libraries/ml5.min.js"></script>
```

### Zufallsmaler (0101)
![Zufallsmaler Animation](/readme_assets/zufallsmaler.gif)

Wir wollen mit unserem ersten p5.js Projekt starten, dies hat noch nichts mit Machine Learning zu tun, zeigt uns aber die Grundlagen wie der Code und p5.js funktioniert. 
Wie ihr oben auf dem GIF seht, wollen wir dieses wunderbaren Zufallsmaler bauen. Mit der Maus bewegen wir den Pinsel, durch ein klick wird zufällig eine neue Farbe ausgewählt.
Den Code dazu findest du hier auf GitHub, klick einfach ganz oben auf den Gründen Button Code und lade dir die Dateien als ZIP herunter. 

Zusammenfassend lernen wir in diesem Beispiel: 
* Grundstruktur von p5.js 
* Was sind Variablen 
* Was sind Funktionen 
* Was ist if/else

### Der Fußballsimulator (0102)
![Fußballsimulator Animation](/readme_assets/fussball_simulator_video.gif) 

Nun wollen wir diesen packenden Fußballsimulator bauen. Dieser vertieft noch einmal einige Konzepte und gibt uns die Sicherheit im nächsten Beispiel mit Machine Learning zu beginnen. 
Den Code dazu findest du hier auf GitHub, klick einfach ganz oben auf den Gründen Button Code und lade dir die Dateien als ZIP herunter. 

Zusammenfassend lernen wir in diesem Beispiel: 
* Was ist die Konsole
* Wie lädt man ein Bild?
* Grundstruktur von p5.js? (vertiefen)
* Was sind Variablen? (vertiefen)
* Was sind Funktionen? (vertiefen)


### Image Classification (0103)
![ml 5 Image Classier Image](/readme_assets/image-classifier.png) 

In diesem Beispiel wollen wir uns erste Schritte mit ml5.js gehen. Dafür lernen wir wie man einzelne Aspekte der Library anspricht. Wie man ein geladenes Bild klassifiziert und die Resultate dann versteht und ausgibt.

Zusammenfassend lernen wir in diesem Beispiel: 
* Was ist ein Callback?
* Wie funktioniert ml5.js?
* Wie lesen wir die Ergebnisse aus einem Object?
* Wie geben wir die Ergebnisse aus?


### NoseNet Clown (0201)
![ml 5 Image Classier Image](/readme_assets/red_nose.gif)  

Heute ist der 10.11.2020 noch ein Tag bis Karneval und da durch Corona dieses Jahr wahrscheinlich eher weniger geht, holen wir uns den Karneval auf unsere Webcam und erstellen uns eine tolle Clownsnase, die unserer echten Nase folgt. 
Und für alle die keine Lust auf Karneval haben, erstellen wir auch gleichzeitig eine niedlich Rudolf Nase für Weihnachten. 
Das ganze läuft im Browser und als Hardware braucht ihr nur eine Webcam. 
Den Code findet ihr wie immer hier Github ganz oben auf dem grünen Button Code und dann Download ZIP.

Zusammenfassend lernen wir in diesem Beispiel: 
* Wie lädt man PoseNet?
* Wie lädt man das Webcam Bild?
* Wie lesen wir die Ergebnisse aus einem Object? (Vertiefen)
* Wie geben wir die Ergebnisse aus? (Vertiefen)


### TeachbleMachine Videocall  (0301)
![ml 5 Image Classier Image](/readme_assets/videocall_gesture.gif)  
