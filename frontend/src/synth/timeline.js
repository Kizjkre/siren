import { FillType } from '../constants/state';
import { ENVELOPE, TIME_FEATURES } from '../constants/workstation';
import store from '../store';

const createTimeline = () => {
  const state = store.getState();
  const timelines = {};

  Object.entries(state.workstation.channels).forEach(([name, channel]) => {
    const max = Math.max(...Object.values(channel.features).map(({ track }) => track === -1 ? 0 : state.workstation.tracks[track].data.length));
    const timeline = new Array(max).fill().map(() => [0, {}]);

    // TODO: negative ADSR-D values for continuous sound.
    ENVELOPE.forEach((feature, i) => {
      if (feature === 'Sustain') return;
      const track = channel.features[feature];
      const data = track.track === -1 ? new Array(timeline.length).fill(state.workstation.synths[channel.synth].adsrd.values[i]) : state.workstation.tracks[track.track].data;
      switch (track.fill) {
        case FillType.STRETCH:
          timeline.forEach((_, j) => {
            const datum = data[Math.floor(data.length / max * j)];
            timeline[j][1][feature] = datum;
            j !== 0 && (timeline[j][0] += datum + timeline[j - 1][0]);
          });
          break;
        case FillType.REPEAT:
          timeline.forEach((_, j) => {
            const datum = data[j % data.length];
            timeline[j][1][feature] = datum;
            j !== 0 && (timeline[j][0] += datum + timeline[j - 1][0]);
          });
          break;
        case FillType.WRAP:
          timeline.forEach((_, j) => {
            const datum = data[Math.floor(j / data.length) % 2 ? data.length - 1 - j % data.length : j % data.length];
            timeline[j][1][feature] = datum;
            j !== 0 && (timeline[j][0] += datum + timeline[j - 1][0]);
          });
          break;
        default:
          throw new TypeError('Undefined fill type.');
      }
    });

    Object.entries(channel.features).filter(([feature, track]) => !TIME_FEATURES.includes(feature) && track.track !== -1).forEach(([feature, track]) => {
      const data = state.workstation.tracks[track.track].data;
      switch (track.fill) {
        case FillType.STRETCH:
          const temp = Object.fromEntries(timeline);
          const increment = (timeline[timeline.length - 1][0] + Object.entries(timeline[timeline.length - 1][1]).filter(([name]) => TIME_FEATURES.includes(name)).reduce((acc, v) => acc + v[1], 0)) / data.length;
          data.forEach((datum, i) => temp[i * increment][feature] = datum);
          Object.entries(temp).forEach(([time, d], i) => timeline[i] = [+time, d]);
          break;
        case FillType.REPEAT:
          timeline.forEach((_, j) => timeline[j][1][feature] = data[j % data.length]);
          break;
        case FillType.WRAP:
          timeline.forEach((_, j) => timeline[j][1][feature] = data[Math.floor(j / data.length) % 2 ? data.length - 1 - j % data.length : j % data.length]);
          break;
        default:
          throw new TypeError('Undefined fill type.');
      }
    });

    timelines[name] = timeline;
  });

  return timelines;
};

export default createTimeline;
