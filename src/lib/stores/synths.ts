import { type Writable, writable } from 'svelte/store';
import type { SynthStore, SynthStoreObject } from '$lib/util/definitions/synths';

const store: Writable<SynthStore> = writable({});

const synths: SynthStoreObject = {
  add: (name: string, code: string): void =>
    store.update((synths: SynthStore): SynthStore => ({ ...synths, [name]: code })),
  remove: (name: string) => store.update((synths: SynthStore): SynthStore => {
    delete synths[name];
    return synths;
  }),
  subscribe: store.subscribe
};

export default synths;
