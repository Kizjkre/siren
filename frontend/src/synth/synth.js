import store from '../store';
import SynthDock from './SynthDock';
import createTimeline from './timeline';

export const play = () => {
  const state = store.getState();
  const timelines = createTimeline();
  console.log(timelines);

  Object.entries(timelines).forEach(([channel, timeline]) => {
    const synth = state.workstation.synths[state.workstation.channels[channel].synth];
    const sd = new SynthDock(synth);

    sd.queue(timeline);
    sd.start();

    // sd.stop(sorted.reverse()[0] + current['Duration']); // TODO: Check if this time is right.
  });
};
