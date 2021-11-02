import { NOTES } from '../constants/workstation';
import SimpleContext from './SimpleContext';

const OPTIONS = {
  gain: 1,
  pan: 0,
  continuous: false,
  num: 1,
  type: 'sine'
};

const calculateFrequency = (note, octave) => 440 * 2 ** (octave - (NOTES[note] > 2 ? 5 : 4)) * 2 ** (NOTES[note] / 12);

export default class SimpleSynth {
  constructor(options = {}) {
    options = Object.assign(options, OPTIONS);

    SimpleContext.createContext();
    SimpleContext.addSynth();

    this._osc = [];
    this._gain = new GainNode(SimpleContext.getContext());
    this._panner = new StereoPannerNode(SimpleContext.getContext());

    for (let i = 0; i < options.num; i++) {
      const osc = new OscillatorNode(SimpleContext.getContext(), { type: options.type });
      osc
        .connect(this._gain)
        .connect(this._panner)
        .connect(SimpleContext.getMasterGain())
        .connect(SimpleContext.getContext().destination);
      this._osc.push(osc);
    }

    this._gain.gain.value = options.gain / options.num;
    this._panner.pan.value = options.pan;

    this._continuous = options.continuous;

    this._duration = 0;
  }

  queue({ note, octave }, start, osc) {
    const time = SimpleContext.toSeconds(start[0], start[1]);

    if (this._continuous) {
      this._osc[osc].frequency.linearRampToValueAtTime(calculateFrequency(note, octave), time);
    } else {
      this._osc[osc].frequency.setValueAtTime(calculateFrequency(note, octave), time);
    }

    this._duration += time;
  }

  // queue(notes, start) {
  //   const time = SimpleContext.toSeconds(start[0], start[1]);
  //   if (this._continuous) {
  //     notes.forEach(({ note, octave }, i) =>
  //       this._osc[i].frequency.linearRampToValueAtTime(calculateFrequency(note, octave), time)
  //     );
  //   } else {
  //     notes.forEach(({ note, octave }, i) =>
  //       this._osc[i].frequency.setValueAtTime(calculateFrequency(note, octave), time)
  //     );
  //   }
  //
  //   this._duration += time;
  // }

  queueGain(gain, start) {
    const time = SimpleContext.toSeconds(start[0], start[1]);
    this._gain.gain.linearRampToValueAtTime(gain, time);
  }

  queuePan(pan, start) {
    const time = SimpleContext.toSeconds(start[0], start[1]);
    this._panner.pan.linearRampToValueAtTime(pan, time);
  }

  play() {
    this._osc.forEach(osc => {
      osc.start();
      osc.stop(this._duration);
    });
  }
}
