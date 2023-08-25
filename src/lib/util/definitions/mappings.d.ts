import type { Writable } from 'svelte/store';
import type { Subscribe } from '$lib/util/definitions/store';

interface MappingStore {
  [id: number]: {
    name: Writable<string>;
    map: Writable<string>;
  };
}

interface MappingStoreObject {
  _addDefault: () => any;
  add: () => any;
  remove: (id: number) => any;
  subscribe: Subscribe<MappingStore>;
}
