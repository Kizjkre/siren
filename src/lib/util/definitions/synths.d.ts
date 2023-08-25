import type { Writable } from 'svelte/store';
import type { Subscribe } from '$lib/util/definitions/store';

interface SynthStore {
  [id: number]: {
    name: string;
    code: string;
    parameters: {
      timbral: {
        [key: string]: 'nominal' | 'ordinal' | 'quantitative'
      },
      time: string[]
    };
    references: Writable<number>;
  };
}

interface SynthStoreObject {
  add: (name: string, code: string, def?: boolean) => any;
  remove: (id: number) => any;
  subscribe: Subscribe<SynthStore>;
}
