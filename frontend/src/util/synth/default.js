export const parameters = {
  time: ['Time'],
  timbral: ['Frequency', 'Gain', 'Pan']
};

const defaultSynth = () => {
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
    start: () => {
      osc.start();
      // if (!duration) {
      //   Object.keys(timeline).sort((a, b) => a - b).forEach((percent, i) => Object.entries(timeline[percent]).forEach(([parameter, value]) => {
      //     update[parameter](value, i);
      //   }));
      // } else {
      //   Object.keys(timeline).sort((a, b) => a - b).forEach(percent => Object.entries(timeline[percent]).forEach(([parameter, value]) => {
      //     parameter !== 'Duration' && update[parameter](value, timeline[percent].Duration);
      //   }));
      // }
      // osc.start();
    },
    stop: () => osc.stop()
  });
};

export default defaultSynth;
