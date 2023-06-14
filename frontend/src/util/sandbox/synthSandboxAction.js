import { state, updateSynthParameters, updateSynthPort } from '../../state/state';

export default () => {
  const listener = e => {
    if (e.origin !== 'null' || e.data.type !== 'synth' || !(e => e.data.name in state.synths && e.data.uuid === state.synths[e.data.name].uuid)) return;
    window.removeEventListener('message', listener);
    const [port] = e.ports;
    port.onmessage = e => {
      updateSynthParameters(e.data.name, e.data.parameters);
      updateSynthPort(e.data.name, port);
      port.onmessage = null;
    };
  };

  return () => window.addEventListener('message', listener);
}
