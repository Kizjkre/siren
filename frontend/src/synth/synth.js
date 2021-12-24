import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import SynthDock from './SynthDock';

export const play = timelines => {
  const state = store.getState();

  Object.values(timelines).forEach(t => {
    const synth = state.workstation.synths[t.synth];
    const sd = new SynthDock(synth).init();
    const timeline = t.timeline;

    sd.start();

    let current = cloneDeep(synth.variables);
    current['Attack'] = synth.adsrd.values[0];
    current['Decay'] = synth.adsrd.values[1];
    current['Sustain'] = synth.adsrd.values[2];
    current['Release'] = synth.adsrd.values[3];
    current['Duration'] = synth.adsrd.values[4];

    const sorted = Object.keys(timeline).map(e => parseFloat(e)).sort((a, b) => a - b);

    sorted.forEach(time => {
      const change = timeline[time];
      Object.assign(current, change);
      sd.queue(current, [current['Attack'], current['Decay'], current['Sustain'], current['Release'], current['Duration']], time);
    });

    sd.stop(sorted.reverse()[0] + current['Duration']); // TODO: Check if this time is right.
  });
};
