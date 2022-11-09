import store from '../../store';

const pause = () => {
  const state = store.getState();

  Object.values(state.workstation.channels).forEach(({ synth }) =>
    state.workstation.synths[synth].settings.port.postMessage({ action: 'pause' })
  );
};

export default pause;
