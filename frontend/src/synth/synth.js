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

      const pitch = isNumerical(rawPitch) ? rawPitch : numerizeToArray(rawPitch);

      const osc = [];
      const gain = new GainNode(context);
      const panner = new StereoPannerNode(context);

      const numOsc = pitch[0].length || 1;

      for (let i = 0; i < numOsc; i++) {
        const node = new OscillatorNode(context, { type: 'sine' });
        node.connect(gain).connect(panner).connect(context.destination);
        osc.push(node);
      }

      const volume = isNumerical(rawVolume) ?
        scale(rawVolume, 'logistic', 0.9 / numOsc, 0.1 / numOsc, average(rawVolume)) :
        scale(numerizeToNumber(rawVolume), 'logistic', 0.9 / numOsc, 0.1 / numOsc, average(numerizeToNumber(rawVolume)));
      const pan = isNumerical(rawPan) ?
        scale(rawPan, 'logistic', 1, -1, average(rawPan)) :
        scale(numerizeToNumber(rawPan), 'logistic', 1, -1, average(numerizeToNumber(rawPan)));

      const maxPitch = Math.max(...pitch.flat());
      const minPitch = Math.min(...pitch.flat());
      const num = SCALES[key].length * 2;
      const normalize = x => Math.round(num / (maxPitch - minPitch) * (x - minPitch));


      const masterLength = Math.min(pitch.length || Infinity, volume.length || Infinity, pan.length || Infinity);
      const length = now + masterLength * 60 / bpm;
      if (volume.length === 0) {
        gain.gain.value = 1 / (state.tracks.length + state.globalSettings.channels.length);
      }

      volume.forEach((datum, i) => gain.gain.linearRampToValueAtTime(datum, now + i / volume.length * length));
      pan.forEach((datum, i) => panner.pan.linearRampToValueAtTime(datum, now + i / pan.length * length));

      if (pitch.length === 0) {
        osc[0].frequency.value = calculateFrequency(SCALES[key][0], 4);
      }
      if (c.continuous) {
        pitch.forEach((datum, i) => {
          if (typeof datum === 'object') {
            datum.forEach((d, j) => {
              const index = normalize(d);
              osc[j].frequency.linearRampToValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
            });
          } else {
            const index = normalize(datum);
            osc[0].frequency.linearRampToValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
          }
        });
      } else {
        pitch.forEach((datum, i) => {
          if (typeof datum === 'object') {
            datum.forEach((d, j) => {
              const index = normalize(d);
              osc[j].frequency.setValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
            });
          } else {
            const index = normalize(datum);
            osc[0].frequency.setValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
          }
        });
      }

      osc.forEach(o => {
        o.start();
        o.stop(length);
      });
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
