import { useState } from '../context/Context';
import defaultSynth from '../util/synth/default?raw';
import useSandboxMessage from './useSandboxMessage';

export default () => {
  const [, { addSynth }] = useState();
  const sandboxMessage = useSandboxMessage();

  sandboxMessage();
  addSynth('Default', defaultSynth);
};
