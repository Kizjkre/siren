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

    const fill = (feature, def, duration) => {
      if (channel.features[feature].track === -1) {
        duration.forEach((_, i) => duration[i] += def);
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

    fill('Attack', state.workstation.synths[channel.synth].adsrd.values[0], duration);
    fill('Decay', state.workstation.synths[channel.synth].adsrd.values[1], duration);
    fill('Release', state.workstation.synths[channel.synth].adsrd.values[3], duration);
    fill('Duration', state.workstation.synths[channel.synth].adsrd.values[4], duration);

    Object.entries(channel.features).forEach(([feature, track]) => {
      if (track.track !== -1) {
        const adsrd = ['Attack', 'Decay', 'Sustain', 'Release', 'Duration'];
        if (adsrd.includes(feature) || state.workstation.tracks[track.track].data.length === max) {
          const temp = new Array(max);
          temp.fill(0);
          let def = state.workstation.synths[channel.synth];
          if (adsrd.includes(feature)) {
            def = def.adsrd.values[adsrd.findIndex(e => e === feature)];
          } else {
            def = def.variables[feature];
          }
          fill(feature, def, temp);
          let accumulator = 0;
          temp.forEach((d, i) => {
            accumulator += duration[i];
            i = accumulator - duration[i];
            if (i in variables) {
              variables[i][feature] = d;
            } else {
              variables[i] = { [feature]: d };
            }
          });
        } else {
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
            case FillType.WRAP:
              data.forEach((d, i) => {
                accumulator += duration[i];
                i = accumulator - duration[i];
                if (i in variables) {
                  variables[i][feature] = d;
                } else {
                  variables[i] = {[feature]: d};
                }
              });
              (track.fill === FillType.REPEAT ? data : data.reverse()).slice(0, max - data.length).forEach((d, i) => {
                accumulator += duration[data.length + i];
                i = accumulator - duration[data.length + i];
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
      }
    });

    timeline[channelName] = { timeline: variables, synth: channel.synth };
  });

  return timeline;
};

export default getTimeline;
