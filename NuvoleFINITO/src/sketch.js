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



async function createDetector() {
	// Configurazione Media Pipe
	// https://google.github.io/mediapipe/solutions/hands
	const mediaPipeConfig = {
		runtime: "mediapipe",
		modelType: "full",
		maxHands: 2,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
	}
	return window.handPoseDetection.createDetector( window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig )
}
