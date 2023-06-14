import { state, updateMappingPort } from '../../state/state';

export default () => new Promise(resolve => {
  const listener = e => {
    if (e.origin !== 'null' || e.data.type !== 'mapping' || !(e.data.name in state.mappings && e.data.uuid === state.mappings[e.data.name].uuid)) return;
    window.removeEventListener('message', listener);
    const [port] = e.ports;
    port.onmessage = e => {
      updateMappingPort(e.data.name, port);
      resolve();
      port.onmessage = null;
    };
  };

  window.addEventListener('message', listener);
});
