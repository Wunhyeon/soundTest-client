const getAudioContext = () => {
    AudioContext = window.AudioContext; /* || window.webkitAudioContext */
    const audioContent = new AudioContext();
    return audioContent;
}

// const createAudioBuffer = async() => {
//     const audioBuffer = await 
// }

export {getAudioContext};