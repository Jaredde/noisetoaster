import React, {useRef} from 'react';
import Sketch from 'react-p5';

let dragging = false;
let minFrequency = 0.5;
let maxFrequency = 2;
let minAmplitude = 0.05;
let maxAmplitude = 0.5;

let amplitude;
let frequency;

const Visualizer = ({meter}) => {
	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(600, 600).parent(canvasParentRef);
	};

	const waveform = useRef()

	waveform.current = meter

	const draw = (p5) => {
		p5.background(0);
		const frequency = p5.lerp(minFrequency, maxFrequency, p5.mouseX / p5.width);
		const amplitude = p5.lerp(minAmplitude, maxAmplitude, p5.mouseY / p5.height);
		
		const dim = Math.min(p5.width, p5.height);
		
		// Draw the background
		p5.noFill();
		p5.stroke(255);
		p5.strokeWeight(dim * 0.0075);
		
		// const time = p5.millis() / 1000;
		p5.ellipse(300,300, 200,200).stroke(p5.color(255, 255, 255))
		if(waveform.current) {
			p5.beginShape();
			waveform.current.map((wave, index) => {
				// const x =;
				const y = Math.pow(wave, 2) * 50;
				p5.curveVertex((index * 10), y + 275)
				// p5.arc(300 + index * 10, 150 + index * 10, 125,125, 0, wave * 180 * Math.PI/180 )
			})
			p5.endShape()
		}

		  

	};
	  
	return (
		<>
			<Sketch setup={setup} draw={draw} />
		</>
	);
};

export default Visualizer