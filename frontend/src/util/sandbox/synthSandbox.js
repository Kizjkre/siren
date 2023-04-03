import { useState } from '../../context/Context';

export default () => {
  const [state, { updateSynthParameters, updateSynthPort }] = useState();

  return [
    e => e.data.name in state.synths && e.data.uuid === state.synths[e.data.name].uuid,
    (e, port) => {
      updateSynthParameters(e.data.name, e.data.parameters);
      updateSynthPort(e.data.name, port);
    }
  ];
}
