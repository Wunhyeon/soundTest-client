import axios from "axios";

const util2 = {
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
    makeAudioBuffer : async (audioContext, arrBuffer) => {
        let audioBuffer = await audioContext.decodeAudioData(arrBuffer);
        return audioBuffer;
    },
    makeAudio : async (audioContext, audioBuffer, gainNode) => {
        let source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        
        source.connect(gainNode).connect(audioContext.destination);
        return source;
    },



}

export default util2;