import React, { useEffect, useState } from 'react';
import util from './util';
const Example3Page = () => {

    const [track, setTrack] = useState('');

    const [gainNode, setGainNode] = useState('');   //음량조절하는 노드

    const makeAudio = async () => {
        let arrBuffer = await util.axiosGetArrayBufferRequest('http://localhost:5000/exam3');
        let audioContext = util.getAudioContext();  //audioContext
        let gainNode = util.makeGainNode(audioContext); // 음량조절node
        let audioFile = await util.makeAudio(audioContext,arrBuffer.data,gainNode);

        setGainNode(gainNode);
        setTrack(audioFile);
    }

    const playTrack = () => {
        if(track){
            track.start();
        }
    }

    const handleVolume = (e) => {
        gainNode.gain.value = e.target.value;
        // setVolume(e.target.volume);
    }

    useEffect(() => {
        makeAudio();
    },[])

    return(
        <div>
            <button onClick={playTrack}>play</button>
            <input type="range" min="0" max="2" onChange={handleVolume} step="0.01" defaultValue="1"></input>
        </div>
    )

}

export default Example3Page;