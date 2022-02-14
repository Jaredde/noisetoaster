import * as Tone from 'tone'

function Output({input, onClickHandler}) {
    const channel = new Tone.Channel(0, 0)
    const inputs  = [...input]
    console.log(inputs);
    // const rightChannel = new Tone.Channel(0, 0)

    if(inputs.length > 0) {
        inputs.forEach(input => {
            console.log(input);
            input.connect(channel)
            console.log('yes');
        });
    }

    channel.toDestination()


    const clickHandler = async (e) => {
        e.preventDefault()
        await channel.start()
        onClickHandler()
          console.log('audio is ready')

      }
    
   

    return  <button id="play" onClick={clickHandler} type="button">Play</button>


}

export default Output