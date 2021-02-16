import { NOTES, SCALES } from '../constants/workstation';

let context;

export const play = (tracks, globalSettings) => {
  if (context) {
    context.resume();
  } else {
    context = new AudioContext();

    let bpm = globalSettings.bpm < 0 ? 60 : globalSettings.bpm;
    let key = globalSettings.key === 'none' ? 'chromatic' : globalSettings.key;

    const now = context.currentTime;

    tracks.forEach(t => {
      if (t.settings.channel.length === 0) {
        const osc = new OscillatorNode(context, { type: 'sine' });
        const gain = new GainNode(context);
        osc.connect(gain).connect(context.destination);
        gain.gain.value = t.settings.mute ? 0 : t.settings.volume / 100 / tracks.length;

        const max = Math.max(...t.data);
        const min = Math.min(...t.data);
        const num = SCALES[key].length * 2;
        const normalize = x => Math.round(num / (max - min) * (x - min));

        if (t.settings.continuous) {
          t.data.forEach((datum, i) => {
            const index = normalize(datum);
            osc.frequency.linearRampToValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
          });
        } else {
          t.data.forEach((datum, i) => {
            const index = normalize(datum);
            osc.frequency.setValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
          });
        }

        osc.start();
        osc.stop(now + t.data.length * 60 / bpm);
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
