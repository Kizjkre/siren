import { NOTES, SCALES } from '../../../constants/workstation';

let context;

export const play = (data, globalSettings) => {
  if (context) {
    context.resume();
  } else {
    context = new AudioContext();

    let bpm = globalSettings.bpm < 0 ? 60 : globalSettings.bpm;
    let key = globalSettings.key === 'none' ? 'chromatic' : globalSettings.key;

    data.forEach(d => {
      if (d.settings.channel.length === 0) {
        const osc = new OscillatorNode(context, { type: 'sine' });
        const gain = new GainNode(context);
        osc.connect(gain).connect(context.destination);
        gain.gain.value = d.settings.mute ? 0 : d.settings.volume / 100 / data.length;

        const max = Math.max(...d.data);
        const min = Math.min(...d.data);
        const num = SCALES[key].length * 2;
        const normalize = x => Math.round(num / (max - min) * (x - min));

        if (d.settings.continuous) {
          d.data.forEach((datum, i) => {
            const index = normalize(datum);
            osc.frequency.linearRampToValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), context.currentTime + i * 60 / bpm);
          });
        } else {
          d.data.forEach((datum, i) => {
            const index = normalize(datum);
            osc.frequency.setValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), context.currentTime + i * 60 / bpm);
          });
        }

        osc.start();
        osc.stop(context.currentTime + d.data.length * 60 / bpm);
      }
    });

    globalSettings.channels.forEach(c => {
      console.log(c);
    });
  }
};

export const pause = () => context.suspend();

export const stop = () => {
  context.close();
  context = undefined;
};

const calculateFrequency = (note, octave) => 440 * 2 ** (octave - (NOTES[note] > 2 ? 5 : 4)) * 2 ** (NOTES[note] / 12);
