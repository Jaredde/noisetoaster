import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Tone from 'tone';

import VCO from './components/VCO';
import Visualizer from './components/visualizer';
import { setIsPlaying } from './reducers/playingSlice';
import './App.scss';

function App() {
  const [value, setValue] = useState(2);
	const [value2, setValue2] = useState(2);
  const [meter, setMeter] = useState([])

  const isPlaying = useSelector(state => state.playing.isPlaying)
  const dispatch = useDispatch()

  VCO(value, value2, setMeter)

	const clickHandler = async () => {
		await Tone.start();
    dispatch(setIsPlaying())
	};




	return (
		<div className="App">
			<header className="App-header">
				<p>
					<button id="play" onClick={() => clickHandler()} type="button">
						{isPlaying ? 'Stop' : 'Play'}
					</button>
				</p>
        <Visualizer meter={meter} />
					{/* <VcoUI value={value} setValue={setValue} value2={value2} setValue2={setValue2} /> */}
			</header>
		</div>
	);
}

export default App;
