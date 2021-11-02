import { SCALES } from '../constants/workstation';
import { isNumerical, numerizeToArray, scale } from '../helper/processing';
import store from '../store/';
import SimpleSynth from './SimpleSynth';
import SimpleContext from './SimpleContext';
import * as d3 from 'd3';

const _ = () => {
  if (SimpleContext.hasContext()) {
    SimpleContext.start();
    return;
  }

  const state = store.getState();

  SimpleContext.createContext();
  SimpleContext.setBpm(state.workstation.settings.bpm < 0 ? 60 : state.workstation.settings.bpm);
  SimpleContext.setKey(state.workstation.settings.key === 'none' ? 'chromatic' : state.workstation.settings.key);
  SimpleContext.setTimesig(state.workstation.settings.timesig);

  Object.values(state.workstation.channels).forEach(channel => {
    const synth = new SimpleSynth();

    channel.Volume.forEach(track => {

    });

    channel.Pitch.forEach((track, i) => {
      const [min, max] = d3.extent(state.workstation.tracks[track].data);
      const num = SCALES[SimpleContext.getKey()].length * 2;
      const normalize = x => Math.round(num / (max - min) * (x - min));

      state.workstation.tracks[track].data.forEach((datum, j) => {
        const beats = SimpleContext.getTimesig()[0];
        synth.queue(SimpleContext.toNoteInScale(normalize(datum)), [j * beats, j % beats], i);
      });
    });

    channel.Pan.forEach(track => {

    });

    channel.Tempo.forEach(track => {

    });
  });
};

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
        num: data[0].length || 1,
        type: 'sine'
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

    // (async () => {
    //   const ctx = new AudioContext();
    //   const map = await createBufferMap(ctx, [{ key: 'note', url: 'http://localhost:3000/violin1-C4.wav' }]);
    //   const dft = new dsp.DFT(map.note.length, map.note.sampleRate);
    //   dft.forward(map.note.getChannelData(0));
    //   const osc = new OscillatorNode(ctx);
    //   const table = ctx.createPeriodicWave(dft.real, dft.imag);
    //   osc.setPeriodicWave(table);
    //   osc.frequency.value = 10;
    //   osc.connect(ctx.destination);
    //   osc.start(0);
    //   osc.stop(1);
    // })();

    const type = ['sine', 'triangle', 'sawtooth']
    Object.values(state.workstation.channels).forEach(({ continuous, features }, i) => {
      const pitch = isNumerical(state.workstation.tracks[features.Pitch].data) ?
        state.workstation.tracks[features.Pitch].data :
        numerizeToArray(state.workstation.tracks[features.Pitch].data);

      const synth = new SimpleSynth({
        gain: 1,
        pan: 0,
        continuous: false,
        num: isNumerical(state.workstation.tracks[features.Pitch].data) ? 1 : pitch[0].length,
        type: type[i]
      });
      const max = Math.max(...pitch.flat());
      const min = Math.min(...pitch.flat());
      const num = SCALES[SimpleContext.getKey()].length * 2;
      const normalizePitch = x => Math.round(num / (max - min) * (x - min));
      const normalizedGain = Object.keys(state.workstation.tracks).includes(features.Volume + '') ?
        scale(state.workstation.tracks[features.Volume].data, 'logistic', 1, 0.25, d3.mean(state.workstation.tracks[features.Volume].data)) :
        [];
      const normalizedPan = Object.keys(state.workstation.tracks).includes(features.Pan + '') ?
        scale(state.workstation.tracks[features.Pan].data, 'logistic', 1, -1, d3.mean(state.workstation.tracks[features.Pan].data)) :
        [];

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
        normalizedGain.forEach((datum, i) => {
          let gain;
          if (typeof datum === 'object') {
            gain = datum;
          } else {
            gain = datum;
          }
          synth.queueGain(
            gain,
            [Math.floor(i / SimpleContext.getTimesig()[0]), i % SimpleContext.getTimesig()[0]]
          );
        });
      }

      if (Object.keys(state.workstation.tracks).includes(features.Pan + '')) {
        normalizedPan.forEach((datum, i) => {
          let pan;
          if (typeof datum === 'object') {
            pan = datum;
          } else {
            pan = datum;
          }
          synth.queuePan(
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
