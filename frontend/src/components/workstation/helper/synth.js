const context = new AudioContext();
const synth = new WebAudioTinySynth({ internalContext: 0, quality: 1 });

synth.setAudioContext(context);
synth.ready().then(() => {

});
