import type { Subscriber, Writable } from 'svelte/store';

interface MappingStore {
  [id: number]: {
    name: Writable<string>;
    map: Writable<string>;
  };
}

interface MappingStoreObject {
  _addDefault: () => void;
  add: () => void;
  remove: (id: number) => void;
  subscribe: Subscriber<Subscriber<MappingStore>>;
}
