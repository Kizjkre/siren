import { useState } from '../context/Context';

export default () => {
  const [state, { updateSynthParameters, updateSynthPort }] = useState();

  const listener = e => {
    if (e.origin !== 'null' || !(e.data.synth in state.synths) || e.data.uuid !== state.synths[e.data.synth].uuid) return;
    window.removeEventListener('message', listener);
    const [port] = e.ports;
    port.onmessage = e => {
      updateSynthParameters(e.data.name, e.data.parameters);
      updateSynthPort(e.data.name, port);
      port.onmessage = null;
    };
  };

  return () => window.addEventListener('message', listener);
};
