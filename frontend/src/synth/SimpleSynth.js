import { NOTES } from '../constants/workstation';

const OPTIONS = {
  gain: 1,
  pan: 0,
  continuous: false,
  num: 1
};

const calculateFrequency = (note, octave) => 440 * 2 ** (octave - (NOTES[note] > 2 ? 5 : 4)) * 2 ** (NOTES[note] / 12);

export default class SimpleSynth {
  constructor(context, options = OPTIONS) {
    SimpleSynth._synths++;

    this._context = context;

    this._osc = [];
    this._gain = new GainNode(context);
    this._panner = new StereoPannerNode(context);

    for (let i = 0; i < options.num; i++) {
      const osc = new OscillatorNode(context, { type: 'sine' });
      osc
        .connect(this._gain)
        .connect(this._panner)
        .connect(context.destination);
      this._osc.push(osc);
    }

    this._gain.gain.value = options.gain / options.num;
    this._panner.pan.value = options.pan;

    this._continuous = options.continuous;

    this._duration = 0;
  }

  static _synths = 0;

  queue(notes, length) {
    if (this._continuous) {
      notes.forEach(({ note, octave }, i) =>
        this._osc[i].frequency.linearRampToValueAtTime(calculateFrequency(note, octave), length)
      );
    } else {
      notes.forEach(({ note, octave }, i) =>
        this._osc[i].frequency.setValueAtTime(calculateFrequency(note, octave), length)
      );
    }

    this._duration += length;
  }

  play() {
    this._osc.forEach(osc => {
      osc.start();
      osc.stop(this._duration);
    });
  }
}