import { NOTES, SCALES } from '../constants/workstation';
import { average, isNumerical, numerizeToArray, numerizeToNumber, scale } from '../helper/processing';
import store from '../store/';
import SimpleSynth from './SimpleSynth';
import SimpleContext from './SimpleContext';

let context;
const simpleContext = new SimpleContext();

export const play = (tracks, globalSettings) => {
  // if (simpleContext.context) {
  if (context) {
    context.resume();
    // simpleContext.start();
  } else {
    context = new AudioContext();

    const bpm = globalSettings.bpm < 0 ? 60 : globalSettings.bpm;
    const key = globalSettings.key === 'none' ? 'chromatic' : globalSettings.key;

    const now = context.currentTime;

    tracks.forEach(t => {
      if (t.settings.channel.length === 0) {
        const data = isNumerical(t.data) ? t.data : numerizeToArray(t.data);

        const synth = new SimpleSynth(context, {
          gain: t.settings.mute ? 0 : t.settings.volume / 100 / (tracks.length + globalSettings.channels.length),
          pan: t.settings.pan / 50,
          continuous: t.settings.continuous,
          num: data[0].length || 1
        });

        const max = Math.max(...data.flat());
        const min = Math.min(...data.flat());
        const num = SCALES[key].length * 2;
        const normalize = x => Math.round(num / (max - min) * (x - min));

        data.forEach((datum, i) => {
          const notes = [];
          if (typeof datum === 'object') {
            datum.forEach(d => {
              const index = normalize(d);
              notes.push({
                note: SCALES[key][index % SCALES[key].length],
                octave: 4 + Math.floor(index / SCALES[key].length)
              });
            });
          } else {
            const index = normalize(datum);
            notes.push({
              note: SCALES[key][index % SCALES[key].length],
              octave: 4 + Math.floor(index / SCALES[key].length)
            });
          }
          synth.queue(notes, now + i * 60 / bpm);
        });

        synth.play();
      }
    });

    globalSettings.channels.forEach(c => {
      const osc = new OscillatorNode(context, { type: 'sine' });
      const gain = new GainNode(context);
      const panner = new StereoPannerNode(context);
      osc.connect(gain).connect(panner).connect(context.destination);

      const data = feature => {
        const controller = c.features.find(f => f.name === feature).controller;
        if (controller < 0) {
          return [];
        }
        return store.getState().tracks.find(t => t.id === controller).data;
      };

      const rawPitch = data('Pitch');
      const rawVolume = data('Volume');
      const rawPan = data('Pan');
      const pitch = isNumerical(rawPitch) ? rawPitch : numerizeToNumber(rawPitch);
      const volume = scale(rawVolume, 'logistic', 1, 0, average(rawVolume));
      const pan = scale(rawPan, 'logistic', 1, -1, average(rawPan));

      const maxPitch = Math.max(...pitch);
      const minPitch = Math.min(...pitch);
      const num = SCALES[key].length * 2;
      const normalize = x => Math.round(num / (maxPitch - minPitch) * (x - minPitch));

      const length = now + pitch.length * 60 / bpm;

      if (volume.length === 0) {
        gain.gain.value = 1 / (tracks.length + globalSettings.channels.length);
      }

      volume.forEach((datum, i) => gain.gain.linearRampToValueAtTime(datum, now + i / pitch.length * length));
      pan.forEach((datum, i) => panner.pan.linearRampToValueAtTime(datum, now + i / pan.length * length));

      if (pitch.length === 0) {
        osc.frequency.value = calculateFrequency(SCALES[key][0], 4);
      }
      if (c.continuous) {
        pitch.forEach((datum, i) => {
          const index = normalize(datum);
          osc.frequency.linearRampToValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
        });
      } else {
        pitch.forEach((datum, i) => {
          const index = normalize(datum);
          osc.frequency.setValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
        });
      }

      osc.start();
      osc.stop(length);
    });
  }
};

export const pause = () => simpleContext.pause();

export const stop = () => {
  // simpleContext.removeContext();
  context.close();
  context = undefined;
};

const calculateFrequency = (note, octave) => 440 * 2 ** (octave - (NOTES[note] > 2 ? 5 : 4)) * 2 ** (NOTES[note] / 12);
