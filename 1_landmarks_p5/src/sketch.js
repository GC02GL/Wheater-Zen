let capture
let detector
let r = 600;
const canvasSize = window.innerWidth;
const ratio = canvasSize / 16 * 9;

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
	return window.handPoseDetection.createDetector( window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig )
}
	

