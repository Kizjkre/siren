import { SCALES } from '../constants/workstation';

export default class SimpleContext {
  static _bpm = 120;
  static _key = 'C';
  static _timesig = [4, 4];
  static _context = null;
  static _current = [0, 0];
  static _synths = 0;
  static _master = null;

  static toSeconds(measure, beat) {
    return (measure * SimpleContext._timesig[0] + beat) * 60 / SimpleContext._bpm;
  }

  static toNoteInScale(index) {
    return {
      note: SCALES[SimpleContext._key][index % SCALES[SimpleContext._key].length],
      octave: 4 + Math.floor(index / SCALES[SimpleContext._key].length)
    };
  }

  static createContext() {
    SimpleContext._context = new AudioContext();
    SimpleContext._context?.suspend();
    SimpleContext._master = new GainNode(SimpleContext._context);
  }

  static removeContext() {
    SimpleContext._context?.close();
    SimpleContext._context = null;
    SimpleContext._master = null;
  }

  static start() {
    SimpleContext._context?.resume();
  }

  static pause() {
    SimpleContext._context?.suspend();
  }

  static nextBeat() {
    if (++SimpleContext._current[1] === SimpleContext._timesig[0]) {
      SimpleContext._current[1] = 0;
      SimpleContext._current[0]++;
    }

    return {
      measure: SimpleContext._current[0],
      beat: SimpleContext._current[1]
    }
  }

  static getTimesig() {
    return SimpleContext._timesig;
  }

  static getContext() {
    if (!SimpleContext._context) {
      SimpleContext.createContext();
    }
    return SimpleContext._context;
  }

  static getKey() {
    return SimpleContext._key;
  }

  static getMasterGain() {
    return SimpleContext._master;
  }

  static setBpm(bpm) {
    SimpleContext._bpm = bpm;
  }

  static setKey(key) {
    SimpleContext._key = key;
  }

  static setTimesig(timesig) {
    SimpleContext._timesig = timesig;
  }

  static addSynth() {
    if (SimpleContext._master) {
      SimpleContext._master.gain.value = 1 / ++SimpleContext._synths;
    }
  }
}
