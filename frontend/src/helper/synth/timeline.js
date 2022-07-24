import { ENVELOPE } from '../../constants/workstation';
import { binsert } from '../processing';

export default class Timeline {
  constructor(synth) {
    this._synth = synth;
    this._variables = {
      ...Object.fromEntries(ENVELOPE.map((f, i) => [f, synth.adsrd.values[i]])),
      ...synth.variables
    };
    this._index = 0;
    this._times = [];
    this._timeline = {};
  }

  add(time, updates) {
    const u = { ...updates };
    Object.keys(u).filter(variable => !(variable in this._variables)).forEach(variable => delete u[variable]);
    console.log(u);
    if (time in this._timeline) {
      // TODO
    } else {
      const i = binsert(this._times, time);
      this._timeline[time] = new TimelineEvent(time, Object.assign({}, i < 1 ? this._variables : this._timeline[this._times[i - 1]], u), Object.keys(u));
    }
    console.log(this._times, this._timeline);
  }

  next() {

  }
}

class TimelineEvent {
  constructor(time, variables = {}, updated = []) {
    this._time = time;
    this._variables = variables;
    this._updated = updated;
  }

  get time() {
    return this._time;
  }

  get variables() {
    return this._variables;
  }

  get updated() {
    return this._updated;
  }
}
