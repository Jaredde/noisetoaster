import { Donut } from 'react-dial-knob';


function VcoUI({value, value2, setValue, setValue2}) {


	return(
		<div>
			<div>
				<Donut
					diameter={200}
					min={1}
					max={10}
					step={1}
					value={value}
					theme={{
						donutColor: 'blue',
					}}
					onValueChange={setValue}
					ariaLabelledBy={'my-label'}
				>
					<label id={'my-label'}>Filter Mod</label>
				</Donut>
			</div>
			<div>
				<Donut
					diameter={200}
					min={1}
					max={10}
					step={1}
					value={value2}
					theme={{
						donutColor: 'blue',
					}}
					onValueChange={setValue2}
					ariaLabelledBy={'my-label'}
				>
					<label id={'my-label'}>Volume Mod</label>
				</Donut>
			</div>
		</div>
	);
}

export default VcoUI