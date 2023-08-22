import { Subscriber } from 'svelte/store';

interface SynthStore {
  [name: string]: string;
}

interface SynthStoreObject {
  add: (name: string, code: string) => void;
  remove: (name: string) => void;
  subscribe: Subscriber<Subscriber<SynthStore>>;
}
