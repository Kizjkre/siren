// noinspection JSUnusedGlobalSymbols
export const parameters = Object.freeze({
  time: ['Time'],
  timbral: { Frequency: 'quantitative', Gain: 'quantitative', Pan: 'quantitative' }
});

const defaultSynth = (context, destination) => {
  const osc = new OscillatorNode(context);
  const gain = new GainNode(context);
  const pan = new StereoPannerNode(context);

  osc.connect(pan).connect(gain).connect(destination);

  return ({
    updates: new Map()
      .set(['Frequency', 'Time'], (f = 440, t = 0) => osc.frequency.setValueAtTime(f, t))
      .set(['Gain', 'Time'], (g = 1, t = 0) => gain.gain.setValueAtTime(g, t))
      .set(['Pan', 'Time'], (p = 0, t = 0) => pan.pan.setValueAtTime(p, t)),
    start: () => osc.start(),
    stop: () => osc.stop()
  });
};

// noinspection JSUnusedGlobalSymbols
export default defaultSynth;
