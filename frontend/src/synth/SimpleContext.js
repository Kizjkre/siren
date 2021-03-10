export default class SimpleContext {
  constructor(options) {
    SimpleContext.bpm = options?.bpm || 120;
    SimpleContext.key = options?.key || 'C';
    SimpleContext.timesig = options?.timesig || [4, 4];
  }

  static bpm = 120;
  static key = 'C';
  static timesig = [4, 4];
  static context = null;

  static _current = [0, 0];

  createContext() {
    SimpleContext.context = new AudioContext();
    SimpleContext.context.suspend();
  }

  removeContext() {
    SimpleContext?.close();
    SimpleContext.context = null;
  }

  start() {
    SimpleContext.context?.resume();
  }

  pause() {
    SimpleContext.context?.suspend();
  }

  nextBeat() {
    if (++SimpleContext._current[1] === SimpleContext.timesig[0]) {
      SimpleContext._current[1] = 0;
      SimpleContext._current[0]++;
    }

    return {
      measure: SimpleContext._current[0],
      beat: SimpleContext._current[1]
    }
  }

  toSeconds(measure, beat) {
    return (measure * SimpleContext.timesig[0] + beat) * 60 / SimpleContext.bpm;
  }

  set bpm(bpm) {
    SimpleContext.bpm = bpm;
  }
}
