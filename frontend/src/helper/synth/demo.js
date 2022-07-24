import { DEFAULT_ADSRD } from '../../constants/workstation';
import SynthDock from '../../synth/SynthDock';
import { add } from '../processing';

export const synthDemo = synth => {
  const sd = new SynthDock(synth);
  sd.synth.adsrd.values.forEach((value, i, arr) => value < 0 && (arr[i] = DEFAULT_ADSRD[i]));
  sd.queue([
    [0, {
      ...sd.synth.variables,
      Sustain: sd.synth.adsrd.values[2]
    }],
    [sd.synth.adsrd.values[0], {
      Attack: sd.synth.adsrd.values[0]
    }],
    [add(sd.synth.adsrd.values[0], sd.synth.adsrd.values[1]), {
      Decay: sd.synth.adsrd.values[1]
    }],
    [add(sd.synth.adsrd.values[0], sd.synth.adsrd.values[1], sd.synth.adsrd.values[4]), {
      Duration: sd.synth.adsrd.values[4]
    }],
    [add(sd.synth.adsrd.values[0], sd.synth.adsrd.values[1], sd.synth.adsrd.values[4], sd.synth.adsrd.values[3]), {
      Release: sd.synth.adsrd.values[3]
    }]
  ]);
  sd.start();
  sd.stop(add(sd.synth.adsrd.values[0], sd.synth.adsrd.values[1], sd.synth.adsrd.values[4], sd.synth.adsrd.values[3]));
};
