import axios from 'axios';
import React, { useEffect, useState } from 'react';

// AudioBuffer파일은 한번 쓰고나면 다시 쓸 수 없기 때문에 다시 재생하려면 서버에 다시 요청하는 방식.
const Example2Page = () => {

    const [trackStatus, setTrackStatus] = useState(true);   //트랙이 재생할수 있는 상태가 true로 해야되서 원래 맨 처음 값은 false여야 맞지만, 처음 페이지가 랜더 될때 자동으로 트랙을 한번 불러오고, 그 다음 재생시켰을 때 false로 바꿔서 페이지가 다시 랜딩 될 수 있도록 했다. 나중에 리팩토링 할 수 있으면 리팩토링
    const [track, setTrack] = useState(''); //audio File Source
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        // requestAudioFile();
        if(!track){
            makeAudio();
        }
        
    },[trackStatus])

    const requestAudioFile = async () => {
        let response = await axios.get('http://localhost:5000/exam2',{
            responseType : 'arraybuffer'
        })
        return response.data;
    }

    const makeAudioContext = () => {
        /*const*/ AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        return audioContext;
    }

    const makeAudio = async () => {
        const audioContext = makeAudioContext();
        const arrBuffer = await requestAudioFile();
        let audioBuffer = await audioContext.decodeAudioData(arrBuffer);

        const source = audioContext.createBufferSource();
        console.log("audioBuffer : ", audioBuffer);
        source.buffer = audioBuffer;

        let gainNode = audioContext.createGain();

        source.connect(gainNode).connect(audioContext.destination);
        // source.start();
        setTrack(source);
        setTrackStatus(true);
        // setVolume(gainNode.gain.value);
    }

    // const makeAudio = async () => {
    //     const audioContext = makeAudioContext();
    // }

    const playTrack = async () => {
        if(trackStatus){
            track.start();
            setTrack('');
            setTrackStatus(false);
        }
        // track.play();
    }

    const handleVolume = (e) => {
        console.log(e.target.value);
        setVolume(e.target.value);
    }


    return(
        <div>
            {/* <audio src={}></audio> */}
            <button data-playing='false' role = 'switch' aria-checked onClick={playTrack}>Play</button>
            {/* <input type="range" min="0" max = "2" value = {volume} step="0.01" onChange = {handleVolume}></input> */}
        </div>
    )
}

export default Example2Page;