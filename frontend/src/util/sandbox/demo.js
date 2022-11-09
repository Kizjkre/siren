import store from '../../store';

const synthDemo = name => {
  const { synths } = store.getState().workstation;

  synths[name].settings.port?.postMessage({ action: 'demo' });
};

export default synthDemo;
