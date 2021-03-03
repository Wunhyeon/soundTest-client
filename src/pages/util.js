import axios from "axios";

const util = {
    axiosGetArrayBufferRequest : async (url) => {
        try{
            let response = await axios.get(url,{
                responseType : 'arraybuffer'
            });
            return response;
        }catch(e){
            console.log("request err : ", e);
        }
    },
    getAudioContext : () => {
        AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        return audioContext;
    },
    makeGainNode : (audioContext) => {
        let gainNode = audioContext.createGain();
        return gainNode;
    },
    makeAudio : async (audioContext, arrBuffer, gainNode) => {
        let decodeData = await audioContext.decodeAudioData(arrBuffer);
        let source = audioContext.createBufferSource();
        source.buffer = decodeData;
        
        source.connect(gainNode).connect(audioContext.destination);
        return source;
    },



}

export default util;