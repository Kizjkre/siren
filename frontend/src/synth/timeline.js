import { FillType } from '../constants/state';
import { TIME_FEATURES } from '../constants/workstation';
import { add } from '../helper/processing';
import store from '../store';

const fill = (fill, { stretch, repeat, wrap, fit }) => {
  switch (fill) {
    case FillType.STRETCH:
      return stretch();
    case FillType.REPEAT:
      return repeat();
    case FillType.WRAP:
      return wrap();
    case FillType.FIT:
      return fit();
    default:
      throw new TypeError(`Undefined fill type: ${ fill }.`);
  }
};

const createTimeline = () => {
  const state = store.getState();
  const timelines = {};

  Object.entries(state.workstation.channels).forEach(([name, channel]) => {
    const notes = [0, '', false];
    Object.entries(channel.features).forEach(([feature, track]) => {
      if (track.track === -1) return;
      const length = state.workstation.tracks[channel.features[feature].track].data.length;
      if (notes[0] < length) {
        if (Object.keys(TIME_FEATURES).includes(feature)) {
          notes[0] = length;
          notes[1] = feature;
          notes[2] = true;
        } else if (!notes[2]) {
          notes[0] = length;
          notes[1] = feature;
        }
      }
    });

    const times = [];
    let sum = 0;
    const timeline = Object.fromEntries(new Array(notes[0]).fill().map((_, i) => {
      const time = [sum, {}];
      times.push(sum);
      Object.entries(TIME_FEATURES).forEach(([feature, j]) => {
        const value = channel.features[feature].track === -1 ? state.workstation.synths[channel.synth].adsrd.values[j] : state.workstation.tracks[channel.features[feature].track].data[i];
        sum = add(sum, value);
        time[1][feature] = value;
      });

      return time;
    }));

    Object.entries(channel.features).filter(([feature]) => !Object.keys(TIME_FEATURES).includes(feature)).forEach(([feature, track]) => {
      if (track.track === -1) {
        timeline[0][feature] = feature === 'Sustain' ? state.workstation.synths[channel.synth].adsrd.values[2] : state.workstation.synths[channel.synth].variables[feature];
        return;
      }
      const data = state.workstation.tracks[channel.features[feature].track].data;
      fill(channel.features[feature].fill, {
        stretch: () => {
          const increment = sum / data.length;
          data.forEach((datum, i) => timeline[i * increment] = { ...timeline[i * increment], [feature]: datum });
        },
        repeat: () => Object.keys(timeline).forEach((time, i) => {
          timeline[time][feature] = data[i % data.length];
        }),
        wrap: () => Object.keys(timeline).forEach((time, i) => {
          timeline[time][feature] = data[Math.floor(i / data.length) % 2 ? data.length - 1 - i % data.length : i % data.length];
        }),
        fit: () => data.forEach((datum, i) => i > times.length - 1 ? null : (timeline[times[i]][feature] = datum))
      });
    });

    timelines[name] = Object.entries(timeline).map(([num, obj]) => [+num, obj]).sort((a, b) => a[0] - b[0]);
  });

  return timelines;
};

export default createTimeline;
