import { SCALES } from '../constants/workstation';
import { average, isNumerical, numerizeToArray, numerizeToNumber, scale } from '../helper/processing';
import store from '../store/';
import SimpleSynth from './SimpleSynth';
import SimpleContext from './SimpleContext';

export const play = () => {
  const state = store.getState();

  if (SimpleContext._context) {
    SimpleContext.start();
  } else {
    SimpleContext.createContext();
    SimpleContext.setBpm(state.workstation.settings.bpm < 0 ? 60 : state.workstation.settings.bpm);
    SimpleContext.setKey(state.workstation.settings.key === 'none' ? 'chromatic' : state.workstation.settings.key);
    SimpleContext.setTimesig(state.workstation.settings.timesig);

    Object.values(state.workstation.tracks).forEach(t => {
      if (t.settings.channel.length !== 0) return;
      const data = isNumerical(t.data) ? t.data : numerizeToArray(t.data);

      const synth = new SimpleSynth({
        gain: t.settings.mute ? 0 : t.settings.volume / 100,
        pan: t.settings.pan / 50,
        continuous: t.settings.continuous,
        num: data[0].length || 1
      });

      const max = Math.max(...data.flat());
      const min = Math.min(...data.flat());
      const num = SCALES[SimpleContext.getKey()].length * 2;
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
    });

    Object.values(state.workstation.channels).forEach(({ continuous, features }) => {
      const pitch = isNumerical(state.workstation.tracks[features.Pitch].data) ?
        state.workstation.tracks[features.Pitch].data :
        numerizeToArray(state.workstation.tracks[features.Pitch].data);

      const synth = new SimpleSynth({
        gain: 1,
        pan: 0,
        continuous: false,
        num: isNumerical(state.workstation.tracks[features.Pitch].data) ? 1 : pitch[0].length
      });
      const max = Math.max(...pitch.flat());
      const min = Math.min(...pitch.flat());
      const num = SCALES[SimpleContext.getKey()].length * 2;
      const normalizePitch = x => Math.round(num / (max - min) * (x - min));
      const normalizeGain = x =>
        scale(x, 'logistic', 1, 0, average(state.workstation.tracks[features.Volume].data));
      const normalizePan = x =>
        scale(x, 'logistic', 1, -1, average(state.workstation.tracks[features.Volume].data));

      pitch.forEach((datum, i) => {
        const notes = [];
        if (typeof datum === 'object') {
          datum.forEach(d => notes.push(SimpleContext.toNoteInScale(normalizePitch(d))));
        } else {
          notes.push(SimpleContext.toNoteInScale(normalizePitch(datum)));
        }
        synth.queue(notes, [Math.floor(i / SimpleContext.getTimesig()[0]), i % SimpleContext.getTimesig()[0]]);
      });

      if (Object.keys(state.workstation.tracks).includes(features.Volume + '')) {
        state.workstation.tracks[features.Volume].data.forEach((datum, i) => {
          let gain;
          if (typeof datum === 'object') {
            gain = normalizeGain(numerizeToNumber(datum));
          } else {
            gain = normalizeGain(datum);
          }
          synth.queueGain(
            gain,
            [Math.floor(i / SimpleContext.getTimesig()[0]), i % SimpleContext.getTimesig()[0]]
          );
        });
      }

      if (Object.keys(state.workstation.tracks).includes(features.Pan + '')) {
        state.workstation.tracks[features.Pan].data.forEach((datum, i) => {
          let pan;
          if (typeof datum === 'object') {
            pan = normalizePan(numerizeToNumber(datum));
          } else {
            pan = normalizePan(datum);
          }
          synth.queueGain(
            pan,
            [Math.floor(i / SimpleContext.getTimesig()[0]), i % SimpleContext.getTimesig()[0]]
          );
        });
      }

      synth.play();
    });

    SimpleContext.start();
  }
};

export const pause = () => SimpleContext.pause();

export const stop = () => {
  SimpleContext.removeContext();
};
