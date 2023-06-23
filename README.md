# Manipolazione
SUPSI
Corso di Interaction Design

Versione live:
https://ixd-supsi.github.io/2023/progetti/3_manipolazione/
SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 3: Weather Zen

# Weather Zen
Autore: Gloria Corradin

https://ixd-supsi.github.io/2023/progetti/1_marionetta_digitale/



## Introduzione e tema
Progettare un sistema di interfaccia con cui è possibile interagire tramite le proprie mani, attraverso la computer vision. La persona che usa l’interfaccia, dopo aver attivato la camera del computer, dovrà poter utilizzare la posizione e/o i gesti di una o due mani come degli input per poter manipolare il sistema. 
Per il mio progetto ho scelto di sperimentare un sistema di interfaccia con due scenari diversi dove l'utente potrà interagire e sperimentare con esso tramite l'utilizzo delle proprie mani riconosciute dalla webcam. 
Il tema scelto è il meteo. Saranno mostrati due scenari dove il primo ci sarà la possibilità di far apparire una bella giornata da una giornata nuvolosa. Mentre il secondo scenario ci sarà la possibilità si far smettere la pioggia in base a dove è posizionata la mano.




## Riferimenti progettuali
Personalmente soffro di meteoropatia e quando il tempo è nuvoloso o piove, mi incupisco e mi piacerebbe far sparire le nuvole col pensiero. Per questo l'interfaccia che ho creato ha l'intenzione di rendere reale la mia idea. Mi sono basata sulle mie percezioni e mi sono documentata su quali sono le principali cause del cambiamento emotivo dovuto dal tempo, appunto le giornate piovose e nuvolose.




## Design dell’interfraccia e modalià di interazione
Il primo scenario è la rappresentazione di un cielo azzurro coperto da nuvole. 
Con il riconoscimento della mano, dove ho posizionato un ellisse dello stesso colore del cielo ma con opacità minore, andrà a nascondere le nuvole finchè il cielo non sarà completamente vuoto da esse. L'utente sarà poi indirizzato ed informato su come interagire con il primo scenario per poi passare ad un secondo scenario tramite il click della lettera "b". Il secondo scenario è cupo e buio con la pioggia che scende interrottamente e tramite il riconoscimento della mano si riuscirà a far smettere di piovere ma solo nei punti in cui sarà mostrata la mano. 
Ogni scenario è accompagnato da un suono di sottofondo adatto.



## Tecnologia usata
Per il primo scenario per la generazione delle nuvole ho utilizzato la funzione 'makeCloud'dove il codice genera un numero casuale di nuvole nell'area definita dalle coordinate x, y.
Il secondo scenario è composta da una serie di linee verticali casuali, che rappresentano la pioggia, sulla base dei valori generati casualmente per l, x e y.

Primo scenario in Javascript
```JavaScript
let capture
let detector


function makeCloud(x, y) {
			noStroke();
			fill(250, 250, 250, 100)

			const num = Math.floor(random(4, 16))

			for (let i = 0; i < num; i++) {

				const d = random(80, 220)
				const nx = x + random(-70, 70)
				const ny = y + random(-30, 30)

				ellipse(nx, ny, d, d / random(1.3, 1.8));
				ellipse(nx, ny, d, d / random(1.3, 1.8));
			}
		}

async function setup() {
	
	createCanvas(windowWidth, windowHeight)

	capture = createCapture(VIDEO)
	capture.size(640, 480)
	capture.hide()

	console.log("Carico modello...")
	detector = await createDetector()
	console.log("Modello caricato.")
	background(0, 205, 255)
	const num = Math.floor(random(4, 20))
			for (let i = 0; i < num; i++) {
				const x = random(200, width - 200)
				const y = random(100, 300)
				makeCloud(x, y)
			}

			
}




async function draw() {

scale(min(windowWidth/640, windowHeight/480))
	

	if (detector && capture.loadedmetadata) {
		const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true })
		const hand = hands[0]

		
			noStroke()
			fill(0, 205, 255, 30)
			
			const k = hand.keypoints[8]
			ellipse(k.x, k.y, 100, 100)
			
		
	}
}
  ```
Primo scenario in Html
```JavaScript
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
		<title>MP Hands: Landmarks [p5js]</title>

		<script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.min.js"></script>
		<script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.min.js"></script>

		<script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.min.js"></script>

		<style>
			* {
				box-sizing: border-box;
				user-select: none;
			}
			html,
			body {
				height: 100%;
			}
			body {
				width: 100%;
				margin: 0;
				padding: 0;
				background-color: lightgray;
			}
			.container {
				margin: 20px 20px;
				position: relative;
			}
			.layer {
				position: absolute;
				top: 0;
				left: 0;
			}
			canvas {
				display: block;
			}
			h1 {
            font-size: 20px;
			margin: 20;
			margin-left: 100;
			position: absolute;
			bottom: 0;
			left:0;
			color: white
			}
			h2 {
			font-size: 40px;
			margin: 20;
			margin-left: 50;
			position: absolute;
			padding-bottom: 0%;
			left:0;
			color: white
			}
h3{
	font-size: 20px;
	margin: 40;
	margin-top: 0%;
	position: absolute;
	padding-bottom: 10%;

}

		</style>
	</head>
	<body>
		<audio src="doc1/birds-in-forest-on-sunny-day-14444.mp3"  autoplay loop></audio>
	

		<h1>Per interagire con il primo scenario muovi la mano davanti alla webcam <br> 
			Per passare al secondo scenario premi il tasto "b"
			
			<br> 
		</h1>
		<h2>Wheter zen</h2>
		<h3><a href="https://ixd-supsi.github.io/2023/progetti/antologiaaduemani/">Indice</a></h3>
		<script src="src/sketch.js"></script>
		<script>
			
			function gestisciTasto(event) {
			  
			  if (event.keyCode === 66) {
				
				window.location.href = "1_landmarks_p5/index.html";
			  }
			}
		
			document.addEventListener("keydown", gestisciTasto);
		  </script>
	</body>
</html>

  ```

Secondo scenario in Javascript
```JavaScript
async function setup() {

	createCanvas(windowWidth, windowHeight)   

	capture = createCapture(VIDEO)
	capture.size(640, windowHeight)
	capture.hide()

	console.log("Carico modello...")
	detector = await createDetector()
	console.log("Modello caricato.")
}

async function draw() {

	scale(min(windowWidth/640, windowHeight/480))

	
	background(0)
	stroke(255)


	for(let i=0; i<500; i+=1) {
		const l = random(10, 150)
		const x = random(0, width)
		const y = random(0, height)
	
		strokeWeight(random(0, 3))
		line(x, y, x, y + l)
	}
	r = (sin(r * 2) * 1000) 
	console.log(r)


if (detector && capture.loadedmetadata) {
		const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true })

		for (let j=0; j<hands.length; j++) {
			const hand = hands[j]
			const handedness = hand.handedness // Left : Right
		

			noStroke()
			fill(0,0,0)
			for (let i=0; i<1; i++) {
				const k = hand.keypoints[i * 4 * 4]
				console.log(k)
				//ellipse(k.x, k.y, 50, 50)
				rect(k.x - r/2, k.y, r, windowHeight)
				circle(k.x, k.y, r)
			}
		}
	}
}

async function createDetector() {
	// Configurazione Media Pipe
	// https://google.github.io/mediapipe/solutions/hands
	const mediaPipeConfig = {
		runtime: "mediapipe",
		modelType: "full",
		maxHands: 2,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
	}
  ```
Secondo scenario Html

```JavaScript

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
		<title>MP Hands: Landmarks [p5js]</title>

		<script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.min.js"></script>
		<script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.min.js"></script>

		<script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.min.js"></script>

		<style>
			* {
				box-sizing: border-box;
				user-select: none;
			}
			html,
			body {
				height: 100%;
			}
			body {
				width: 100%;
				margin: 0;
				padding: 0;
				background-color: lightgray;
				position: relative;
			}
			.container {
				margin: 40px 0px;
				position: relative;
			}
			.layer {
				position: absolute;
				top: 0;
				left: 0;
			}
			canvas {
				display: block;
			}
			h1 {
            font-size: 20px;
			margin: 20;
			margin-left: 100;
			position: absolute;
			bottom: 0;
			left:0;
			color: white
			}
			/* video {
				transform: scaleX(-1);
				display: block;
			} */
		</style>
	</head>
	<body>

		<h1>Per interagire con il secondo scenario muovi la mano davanti alla webcab
		</h1>
		<audio src="doc/light-rain-ambient-114354.mp3"  autoplay loop></audio>

		<script src="src/sketch.js"></script>
		<script>
			
			function gestisciTasto(event) {
			  
			  if (event.keyCode === 65) {
		
				window.location.href = "../../index.html";
			  }
			}
		
			
			document.addEventListener("keydown", gestisciTasto);
		  </script>

	</body>
</html>
```


## Target e contesto d’uso
Il target che ho scelto si riferisce ad un vasto gruppo di persone in particolar modo a quelle che soffrono di disturbi di meteoropatia.
È un progetto di sperimentazione e un'attività di rilassamento. 
Attraverso questa interfaccia ho voluto dare la possibilità all'utente di modificare il tempo, cosa che nella realtà non può accadere.





https://github.com/GC02GL/Wheater-Zen/assets/126774228/b301f4ee-e369-4683-885b-4ee0f5d5b80d





 
