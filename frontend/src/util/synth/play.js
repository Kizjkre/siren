import { FillType } from '../../constants/state';
import store from '../../store';

const play = () => {
  const state = store.getState();

  Object.values(state.workstation.channels).forEach(({ features, synth, tracks }) => {
    const max = Math.max(...tracks.map(track => state.workstation.tracks[track].data.length));
    const timeline = {};
    Object.entries(features)
      .filter(([, { track }]) => Object.keys(state.workstation.tracks).includes('' + track))
      .forEach(([feature, { track, fill }]) => {
        const { data } = state.workstation.tracks[track];
        switch (fill) {
          case FillType.FILL:
            Array(max).fill().forEach((_, i) => {
              timeline[i / max.length] = { ...timeline[i / max.length], [feature]: data[Math.round(i / max.length * data.length)] };
            });
            break;
          case FillType.FIT:
            data.forEach((datum, i) => {
              const increment = 100 / max;
              timeline[increment * i] = { ...timeline[increment * i], [feature]: datum };
            });
            break;
          case FillType.REPEAT:
            Array(Math.ceil(max / data.length)).fill().forEach((_, i) => {
              data.forEach((datum, j) => {
                if (j + data.length * i >= max) return;
                const increment = 100 / max;
                timeline[increment * (j + data.length * i)] = { ...timeline[increment * (j + data.length * i)], [feature]: datum };
              });
            });
            break;
          case FillType.STRETCH:
          default:
            data.forEach((datum, i) => {
              const increment = 100 / data.length;
              timeline[increment * i] = { ...timeline[increment * i], [feature]: datum };
            });
            break;
          case FillType.WRAP:
            Array(Math.ceil(max / data.length)).fill().forEach((_, i) => {
              (!(i % 2) ? data : data.reverse()).forEach((datum, j) => {
                if (j + data.length * i >= max) return;
                const increment = 100 / max;
                timeline[increment * (j + data.length * i)] = { ...timeline[increment * (j + data.length * i)], [feature]: datum };
              });
            });
            break;
        }
      });
    state.workstation.synths[synth].settings.port.postMessage({ action: 'play', timeline, gain: 1 / Object.values(state.workstation.channels).length });
  });
};

export default play;
