import { useState } from '../context/Context';
import synthSandbox from '../util/sandbox/synthSandbox';
import defaultSynth from '../util/synth/default?raw';
import useSandboxMessage from './useSandboxMessage';

export default () => {
  const [, { addSynth }] = useState();
  const sandboxMessage = useSandboxMessage(...synthSandbox());

  sandboxMessage();
  addSynth('Default', defaultSynth);
};
