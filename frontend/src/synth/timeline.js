import store from '../store';
import { FillType } from '../constants/state';

const getTimeline = () => {
  const state = store.getState();
  const timeline = {};

  Object.entries(state.workstation.channels).forEach(([channelName, channel]) => {
    const variables = {};

    const max = Math.max(...Object.values(channel.features).map(({ track }) => track === -1 ? 0 : state.workstation.tracks[track].data.length));
    const duration = new Array(max);
    duration.fill(0);

    const fillDuration = (feature, index, duration) => {
      if (channel.features[feature].track === -1) {
        duration.forEach((_, i) => duration[i] += state.workstation.synths[channel.synth].adsrd.values[index]);
      } else {
        const dur = state.workstation.tracks[channel.features[feature].track].data;
        switch (channel.features[feature].fill) {
          case FillType.STRETCH:
            duration.forEach((_, i) => duration[i] += dur[Math.floor(dur.length / max * i)]);
            break;
          case FillType.REPEAT:
            const temp1 = dur.concat(dur.slice(0, max - dur));
            duration.forEach((_, i) => duration[i] += temp1[i]);
            break;
          case FillType.WRAP:
            const temp2 = dur.concat(dur.reverse().slice(0, max - dur));
            duration.forEach((_, i) => duration[i] += temp2[i]);
            break;
          default:
            throw new TypeError('Undefined fill type.');
        }
      }
    };

    fillDuration('Attack', 0, duration);
    fillDuration('Decay', 1, duration);
    fillDuration('Release', 3, duration);
    fillDuration('Duration', 4, duration);

    Object.entries(channel.features).forEach(([feature, track]) => {
      if (feature === 'Duration' && track.track !== -1) {
        const temp = new Array(max);
        temp.fill(0);
        fillDuration('Duration', 4, temp);
        let accumulator = 0;
        temp.forEach((d, i) => {
          accumulator += duration[i];
          i = accumulator;
          if (i in variables) {
            variables[i][feature] = d;
          } else {
            variables[i] = { [feature]: d };
          }
        });
      } else if (feature !== 'Duration' && track.track !== -1) {
        const data = state.workstation.tracks[track.track].data;
        let accumulator = 0;
        switch (track.fill) {
          case FillType.STRETCH:
            const sum = duration.reduce((a, v) => a + v);
            data.forEach((d, i) => {
              if (sum / data.length * i in variables) {
                variables[sum / data.length * i][feature] = d;
              } else {
                variables[sum / data.length * i] = {[feature]: d};
              }
            });
            break;
          case FillType.REPEAT:
            data.forEach((d, i) => {
              accumulator += duration[i];
              i = accumulator;
              if (i in variables) {
                variables[i][feature] = d;
              } else {
                variables[i] = {[feature]: d};
              }
            });
            data.slice(0, max - data.length).forEach((d, i) => {
              accumulator += duration[data.length + i];
              i = accumulator;
              if (i in variables) {
                variables[i][feature] = d;
              } else {
                variables[i] = {[feature]: d};
              }
            });
            break;
          case FillType.WRAP:
            data.forEach((d, i) => {
              i = duration[i];
              if (i in variables) {
                variables[i][feature] = d;
              } else {
                variables[i] = {[feature]: d};
              }
            });
            data.reverse().slice(0, max - data.length).forEach((d, i) => {
              i = duration[data.length + i];
              if (i in variables) {
                variables[i][feature] = d;
              } else {
                variables[i] = {[feature]: d};
              }
            });
            break;
          default:
            throw new TypeError('Undefined fill type.');
        }
      }
    });

    timeline[channelName] = { timeline: variables, synth: channel.synth };
  });

  return timeline;
};

export default getTimeline;
