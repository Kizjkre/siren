import { addSynth } from '../state/state';
import synthSandbox from '../util/sandbox/synthSandboxAction';
import defaultSynth from '../util/synth/default?raw';

export default () => {
  const sandboxMessage = synthSandbox();

  sandboxMessage();
  addSynth('Default', defaultSynth);
};
