// noinspection JSUnusedGlobalSymbols
export const parameters: { time: string[], timbral: { [parameter: string]: string } } = Object.freeze({
  time: ['Time'],
  timbral: { Frequency: DataTypes.Quantitative, Gain: DataTypes.Quantitative, Pan: DataTypes.Quantitative }
});

const defaultSynth = (): void => {
  /* 440 * (2 ^ (1 / 12)) ^ x */
  const context = new AudioContext();
  const osc = new OscillatorNode(context);
  const gain = new GainNode(context);
  const pan = new StereoPannerNode(context);

  gain.connect(context.destination);
  pan.connect(gain);
  osc.connect(pan);

  return ({
    context,
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
