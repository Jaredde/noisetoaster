import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as Tone from 'tone';

function VCO(value, value2, setMeter) {
	const isPlaying = useSelector((state) => state.playing.isPlaying);

	const synth1 = useRef();
	const synth2 = useRef();
	const filter = useRef();
	const filter2 = useRef();
	const vol = useRef();
	const lfo = useRef();
	const lfo2 = useRef();
	const lfo3 = useRef();
	const loopA = useRef();
	const loopB = useRef();
	const loopC = useRef();
	const loopD = useRef();
	const leftPanner = useRef();
	const rightPanner = useRef();
	const echo = useRef();
	const delay = useRef();
	const delayFade = useRef();
    const membraneSynth = useRef();
    const noiseSynth = useRef();
    const noiseGain = useRef();

	const now = Tone.now();
	// const meter = useRef()
	const analyzer = useRef();
	const analyzer2 = useRef();

	let filterControlSignal = value / 10;
	let volumeControlSignal = value2 / 10;
	console.log(isPlaying);

	useEffect(() => {
		synth1.current = new Tone.MonoSynth({
			oscillator: {
				type: 'sawtooth',
			},
			envelope: {
				attack: 0.1,
				release: 4,
				releaseCurve: 'linear',
			},
		});
		synth2.current = new Tone.MonoSynth({
			oscillator: {
				type: 'square',
			},
			envelope: {
				attack: 0.25,
				release: 4,
				releaseCurve: 'linear',
			},
		});
        membraneSynth.current = new Tone.MembraneSynth();
        noiseSynth.current = new Tone.NoiseSynth();
        noiseGain.current = new Tone.Gain(0.6)
		filter.current = new Tone.Filter(1200, 'lowpass');
		filter2.current = new Tone.Filter(1200, 'lowpass');
		leftPanner.current = new Tone.Panner(-0.5);
		rightPanner.current = new Tone.Panner(0.5);

		echo.current = new Tone.FeedbackDelay('16n', 0.2);
		delay.current = new Tone.Delay(12.0);
		delayFade.current = new Tone.Gain(0.9);
		// vol.current = new Tone.Volume().toDestination();

		lfo.current = new Tone.LFO(4, 10, 1200); // hertz, min, max
		// lfo2.current = new Tone.LFO(0.1, -100, 0); // hertz, min, max
		// lfo3.current = new Tone.LFO(2, -500, 1800); // hertz, min, max

		analyzer.current = new Tone.Analyser('waveform', 64);
		analyzer2.current = new Tone.Analyser('waveform', 64);
		// meter.current = new Tone.Meter()
	}, []);

	// useEffect(() => {

	//     if(lfo.current && lfo2.current) {
	//         lfo2.current.amplitude.setValueAtTime(volumeControlSignal, now)
	//         lfo3.current.amplitude.setValueAtTime(filterControlSignal, now)
	//     }
	// }, [value, value2]);

	// useEffect(() => {

	// // 	if (lfo.current) {
	// // 		lfo.current.connect(filter.current.frequency);

	// // 		lfo2.current.connect(vol.current.volume);

	// //         lfo3.current.connect(vco1.current.frequency);
	// // 	}
	// 	// if (vco1.current) {
	// 		// vco1.current.chain(filter.current, vol.current);
	// 	// }
	// 	if (vco1.current) {
	// //         // vol.connect(meter)
	// 	}
	// }, [])

	useEffect(() => {
		if (synth1.current && isPlaying) {
            lfo.current.amplitude.setValueAtTime(filterControlSignal, now)
            lfo.current.connect(filter2.current.frequency);

			lfo.current.start();
			// lfo2.current.start();
			// lfo3.current.start();

			// vco1.current.start();
			synth1.current.connect(leftPanner.current);
			synth2.current.connect(rightPanner.current);
            membraneSynth.current.connect(rightPanner.current);
            noiseSynth.current.connect(noiseGain.current);
            noiseGain.current.connect(echo.current);

            leftPanner.current.connect(filter2.current)
            rightPanner.current.connect(filter.current)
            filter.current.connect(echo.current);
            filter2.current.connect(echo.current);
			echo.current.connect(delay.current);
			delay.current.toDestination();
			delay.current.connect(delayFade.current);
			delayFade.current.connect(delay.current);

			delay.current.connect(analyzer.current);

			loopA.current = new Tone.Loop((time) => {
				synth1.current.triggerAttackRelease('C4', '2n', time);
				synth1.current.triggerAttackRelease('A3', '1m', '+2:2');
                synth1.current.triggerAttackRelease('D4', '2n', '+8:2');
				synth1.current.triggerAttackRelease('G4', '4n', '+11:2');
			}, '16m').start(0);

			loopB.current = new Tone.Loop((time) => {
				synth2.current.triggerAttackRelease('E3', '2n', time);
				synth2.current.triggerAttackRelease('C2', '1m', '+4:1');
				synth2.current.triggerAttackRelease('A3', '2n', '+8:0');
			}, '12m').start('4m');

            loopC.current = new Tone.Loop((time) => {
                membraneSynth.current.triggerAttackRelease('C2', '8n', time);
                membraneSynth.current.triggerAttackRelease('C2', '4n', '+0:0:4');
                membraneSynth.current.triggerAttackRelease('C2', '4n', '+0:0:4');
            }, '13m').start('6m')

            loopD.current = new Tone.Loop((time) => {
                noiseSynth.current.triggerAttackRelease("4n", time)
                noiseSynth.current.triggerAttackRelease("4n", '+0:0:2')
                noiseSynth.current.triggerAttackRelease("4n", '+0:0:3')
            }, '8m').start('8m')

			Tone.Transport.start();
		} else {
			// lfo.current.stop();
			// lfo2.current.stop();
			// lfo3.current.stop();

			// vco1.current.stop();
			Tone.Transport.stop();
		}
	}, [isPlaying]);

	useEffect(() => {
		Tone.Transport.scheduleRepeat((time) => {
			// use the time argument to schedule a callback with Draw
			Tone.Draw.schedule(() => {
				// do drawing or DOM manipulation here
				setMeter(analyzer.current.getValue());

				console.log(analyzer.current.getValue());
			}, time);
		}, 0.01);
	},[isPlaying]);
}
export default VCO;
