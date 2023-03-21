import { useState } from '../context/Context';
import defaultSynth from '../util/synth/default?raw';
import useFrameMessage from './useFrameMessage';

export default () => {
  const [, { addSynth }] = useState();
  const frameMessage = useFrameMessage();

  frameMessage();
  addSynth('Default', defaultSynth);
};
