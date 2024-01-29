import type { Writable } from 'svelte/store';
import type { Subscribe } from '$lib/util/definitions/store';
import type { Types } from '$lib/util/definitions/types';

interface Synth {
  name: string;
  code: string;
  parameters: {
    timbral: {
      [key: string]: Types
    },
    time: string[]
  };
  references: Writable<number>;
}

interface SynthStore {
  [id: number]: Synth
}

interface SynthStoreInterface {
  add: (name: string, code: string, def?: boolean) => any;
  remove: (id: number) => any;
  subscribe: Subscribe<SynthStore>;
}
