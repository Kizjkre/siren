export const parameters = {
  Frequency: {},
  Gain: {},
  Pan: {},
  Duration: {
    fill: ['Repeat', 'Wrap']
  }
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

  let duration = null;
  const update = {
    Frequency: (frequency, time) => osc.frequency.setValueAtTime(frequency, time),
    Gain: (g, time) => gain.gain.setValueAtTime(g, time),
    Pan: (p, time) => pan.pan.setValueAtTime(p, time)
  };

  return ({
    context,
    update: [
      [({ Frequency }, time) => osc.setValueAtTime(Frequency, time), 'Frequency'],
      [({ Gain }, time) => gain.setValueAtTime(Gain, time), 'Gain'],
      [({ Pan }, time) => pan.setValueAtTime(Pan, time), 'Pan'],
      [({ Duration }, time) => null, 'Duration']
    ],
    start: timeline => {
      if (!duration) {
        Object.keys(timeline).sort((a, b) => a - b).forEach((percent, i) => Object.entries(timeline[percent]).forEach(([parameter, value]) => {
          console.log(percent, value, i);
          update[parameter](value, i);
        }));
      } else {
        Object.keys(timeline).sort((a, b) => a - b).forEach(percent => Object.entries(timeline[percent]).forEach(([parameter, value]) => {
          parameter !== 'Duration' && update[parameter](value, timeline[percent].Duration);
        }));
      }
      osc.start();
    },
    stop: () => osc.stop()
  });
};

export default defaultSynth;
