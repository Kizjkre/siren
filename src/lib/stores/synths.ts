import { get, type Writable, writable } from 'svelte/store';
import type { SynthStore, SynthStoreObject } from '$lib/util/definitions/synths';
import { onSandboxReturn, useSandbox } from '$lib/util/sandbox/useSandbox';
// @ts-ignore
import action from '$lib/util/sandbox/action/params?raw';

const store: Writable<SynthStore> = writable({});

const synths: SynthStoreObject = {
  add: (name: string, code: string, def?: boolean): any => {
    const id: number = def ? 0 : new Date().getTime();

    onSandboxReturn('synth', (e: CustomEventInit): any =>
      store.update((synths: SynthStore): SynthStore => ({
        ...synths,
        [id]: { ...synths[id], parameters: e.detail }
      }))
    );

    useSandbox('synth', {
      action,
      script: code
    });

    store.update((synths: SynthStore): SynthStore => ({
      ...synths,
      [id]: { name, code, parameters: { timbral: {}, time: [] }, references: writable(0) }
    }));
  },
  remove: (id: number): any =>
    get(get(synths)[id].references) === 0 &&
    store.update((synths: SynthStore): SynthStore => {
      delete synths[id];
      return synths;
    }),
  subscribe: store.subscribe
};

export default synths;
