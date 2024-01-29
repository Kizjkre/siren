import { get, type Writable, writable } from 'svelte/store';
import type { SynthStore, SynthStoreInterface } from '$lib/util/definitions/synths';
// @ts-ignore
import params from '$lib/util/sandbox/action/params?raw';
import sandbox from '$lib/stores/sandbox';

const store: Writable<SynthStore> = writable<SynthStore>({});

const synths: SynthStoreInterface = {
  add: (name: string, code: string, def?: boolean): any => {
    const id: number = def ? 0 : new Date().getTime();

    sandbox
      .read(`synth-${ id }`)
      .then(({ payload: result }: { action: string, payload: any }): any => {
        store.update((synths: SynthStore): SynthStore => ({
          ...synths,
          [id]: { ...synths[id], parameters: result }
        }));
      });

    // noinspection JSIgnoredPromiseFromCall
    sandbox.add(`synth-${ id }`, {
      action: params,
      scripts: { userscript: code }
    });

    store.update((synths: SynthStore): SynthStore => ({
      ...synths,
      [id]: { name, code, parameters: { timbral: {}, time: [] }, references: writable<number>(0) }
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
