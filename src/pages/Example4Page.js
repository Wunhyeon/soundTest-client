import React, { useEffect, useState } from "react";
import util2 from "./util2";
const Example4Page = () => {
  const [audioBuffer, setAudioBuffer] = useState("");
  const [audioContext, setAudioContext] = useState("");

  const [gainNode, setGainNode] = useState(""); //음량조절하는 노드

  const [count, setCount] = useState(0);

  const init = async () => {
    console.log("@@@");
    // let arrBuffer = await util2.axiosGetArrayBufferRequest('http://localhost:5000/exam4');
    let arrBuffer = await util2.axiosGetArrayBufferRequest(
      "http://localhost:5000/quiz/audioFile"
    );
    let audioContext = util2.getAudioContext(); //audioContext
    let gainNode = util2.makeGainNode(audioContext); // 음량조절node
    let audioBuffer = await util2.makeAudioBuffer(audioContext, arrBuffer.data);

    // let audioFile = await util2.makeAudio(audioContext,audioBuffer,gainNode);

    setAudioContext(audioContext);
    setGainNode(gainNode);
    setAudioBuffer(audioBuffer);
    // setTrackStatus(true);
  };

  const makeTrack = async () => {
    let audioFile = await util2.makeAudio(audioContext, audioBuffer, gainNode);
    return audioFile;
  };

  const playTrack = async () => {
    // if(trackStatus){
    //     makeTrack().start();
    // }else{
    //     makeTrack();

    // }
    let track = await makeTrack();
    track.start();
    setCount(count + 1);
  };

  const handleVolume = (e) => {
    gainNode.gain.value = e.target.value;
    // setVolume(e.target.volume);
  };

  useEffect(() => {
    if (!audioBuffer || !audioContext || !gainNode) {
      init();
    }
  }, []);

  return (
    <div>
      <button onClick={playTrack}>play</button>
      {count}
      <input
        type="range"
        min="0"
        max="2"
        onChange={handleVolume}
        step="0.01"
        defaultValue="1"
      ></input>
    </div>
  );
};

export default Example4Page;
