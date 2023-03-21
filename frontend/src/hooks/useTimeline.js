import { createEffect } from 'solid-js';
import { STATUS } from '../constants/constants';
import { useState } from '../context/Context';
import useStatus from './useStatus';

export default () => {
  const [state] = useState();
  const { status } = useStatus;

  let prev = null;

  createEffect(() => {
    switch (status()) {
      case STATUS.PAUSED:
        state.tracks.forEach(({ synth }) => state.synths[synth].port.postMessage({ action: 'pause' }));
        prev = STATUS.PAUSED;
        break;
      case STATUS.STOPPED:
        state.tracks.forEach(({ synth }) => state.synths[synth].port.postMessage({ action: 'stop' }));
        prev = STATUS.STOPPED;
        break;
      case STATUS.PLAYING:
        // TODO: memoize
        if (prev === STATUS.PAUSED) {
          state.tracks.forEach(({ synth }) => state.synths[synth].port.postMessage({ action: 'resume' }));
          prev = STATUS.PLAYING;
          break;
        }
        state.tracks.forEach((track, i) => {
          const timeline = {};
          Object.entries(track.regions).forEach(([parameter, regions]) => {
            regions.forEach(({ start, data, length }) => {
              let offset = 0;
              data.forEach((datum, j) => {
                timeline[start + offset] = { ...(timeline[start + offset] || {}), [parameter]: datum };
                offset += length[j];
              });
              timeline[start + offset] = { ...(timeline[start + offset] || {}), [parameter]: null };
            });
          });
          state.synths[track.synth].port.postMessage({ action: 'play', timeline: timeline, gain: 1 / state.tracks.length });
        });
        prev = STATUS.PLAYING;
        break;
    }
  });
};
