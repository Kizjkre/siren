import { NOTES, SCALES } from '../constants/workstation';
import { average, isNumerical, numerize, scale } from '../helper/processing';
import store from '../store/';

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
        const panner = new StereoPannerNode(context);
        osc.connect(gain).connect(panner).connect(context.destination);
        gain.gain.value = t.settings.mute ? 0 : t.settings.volume / 100 / (tracks.length + globalSettings.channels.length);
        panner.pan.value = t.settings.pan / 50;

        const data = isNumerical(t.data) ? t.data : numerize(t.data);

        const max = Math.max(...data);
        const min = Math.min(...data);
        const num = SCALES[key].length * 2;
        const normalize = x => Math.round(num / (max - min) * (x - min));

        if (t.settings.continuous) {
          data.forEach((datum, i) => {
            const index = normalize(datum);
            osc.frequency.linearRampToValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
          });
        } else {
          data.forEach((datum, i) => {
            const index = normalize(datum);
            osc.frequency.setValueAtTime(calculateFrequency(SCALES[key][index % SCALES[key].length], 4 + Math.floor(index / SCALES[key].length)), now + i * 60 / bpm);
          });
        }

        osc.start();
        osc.stop(now + t.data.length * 60 / bpm);
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
      const pitch = isNumerical(rawPitch) ? rawPitch : numerize(rawPitch);
      const volume = scale(rawVolume, 'logistic', 1, 0, average(rawVolume));
      const pan = scale(rawPan, 'logistic', 1, -1, average(rawPan));

      const maxPitch = Math.max(...pitch);
      const minPitch = Math.min(...pitch);
      const num = SCALES[key].length * 2;
      const normalize = x => Math.round(num / (maxPitch - minPitch) * (x - minPitch));

      if (volume.length === 0) {
        gain.gain.value = 1 / (tracks.length + globalSettings.channels.length);
      }

      volume.forEach((datum, i) => gain.gain.linearRampToValueAtTime(datum, now + i * 60 / bpm));
      pan.forEach((datum, i) => panner.pan.linearRampToValueAtTime(datum, now + i * 60 / bpm));

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
      osc.stop(now + Math.max(pitch.length, volume.length, pan.length) * 60 / bpm);
    });
  }
};

export const pause = () => context.suspend();

export const stop = () => {
  context.close();
  context = undefined;
};

const calculateFrequency = (note, octave) => 440 * 2 ** (octave - (NOTES[note] > 2 ? 5 : 4)) * 2 ** (NOTES[note] / 12);
