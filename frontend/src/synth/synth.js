import { NOTES, SCALES } from '../constants/workstation';
import { average, isNumerical, numerizeToArray, numerizeToNumber, scale } from '../helper/processing';
import store from '../store/';
import SimpleSynth from './SimpleSynth';
import SimpleContext from './SimpleContext';

let context;

export const play = () => {
  const state = store.getState();

  if (SimpleContext.context) {
    context.resume();
    SimpleContext.start();
  } else {
    context = new AudioContext();
    SimpleContext.createContext();
    SimpleContext.setBpm(state.globalSettings.bpm < 0 ? 60 : state.globalSettings.bpm);
    SimpleContext.setKey(state.globalSettings.key === 'none' ? 'chromatic' : state.globalSettings.key);
    SimpleContext.setTimesig(state.globalSettings.timesig);

    const bpm = state.globalSettings.bpm < 0 ? 60 : state.globalSettings.bpm;
    const key = state.globalSettings.key === 'none' ? 'chromatic' : state.globalSettings.key;

    const now = context.currentTime;

    state.tracks.forEach(t => {
      if (t.settings.channel.length === 0) {
        const data = isNumerical(t.data) ? t.data : numerizeToArray(t.data);

        const synth = new SimpleSynth(context, {
          gain: t.settings.mute ? 0 : t.settings.volume / 100 / (state.tracks.length + state.globalSettings.channels.length),
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
            datum.forEach(d => notes.push(SimpleContext.toNoteInScale(normalize(d))));
          } else {
            notes.push(SimpleContext.toNoteInScale(normalize(datum)));
          }
          synth.queue(notes, [Math.floor(i / SimpleContext.getTimesig()[0]), i % SimpleContext.getTimesig()[0]]);
        });

        synth.play();
      }
    });

    state.globalSettings.channels.forEach(c => {
      const osc = new OscillatorNode(context, { type: 'sine' });
      const gain = new GainNode(context);
      const panner = new StereoPannerNode(context);
      osc.connect(gain).connect(panner).connect(context.destination);

      const data = feature => {
        const controller = c.features.find(f => f.name === feature).controller;
        if (controller < 0) {
          return [];
        }
        return state.tracks.find(t => t.id === controller).data;
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
        gain.gain.value = 1 / (state.tracks.length + state.globalSettings.channels.length);
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

    SimpleContext.start();
  }
};

export const pause = () => SimpleContext.pause();

export const stop = () => {
  SimpleContext.removeContext();
  context.close();
  context = undefined;
};

const calculateFrequency = (note, octave) => 440 * 2 ** (octave - (NOTES[note] > 2 ? 5 : 4)) * 2 ** (NOTES[note] / 12);
