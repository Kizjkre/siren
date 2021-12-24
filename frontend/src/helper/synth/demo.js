import SynthDock from '../../synth/SynthDock';

export const synthDemo = synth => {
  const sd = new SynthDock(synth).init();
  sd.start();
  sd.queue(sd.synth.variables, sd.synth.adsrd.values, sd.now);
  sd.stop(sd.synth.adsrd.values[4] / (1 - (sd.synth.adsrd.values[0] + sd.synth.adsrd.values[1] + sd.synth.adsrd.values[3])));
};
