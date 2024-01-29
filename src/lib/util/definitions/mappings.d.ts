import type { Writable } from 'svelte/store';
import type { Subscribe } from '$lib/util/definitions/store';

interface Mapping {
  name: Writable<string>;
  map: Writable<string>;
}

interface MappingStore {
  [id: number]: Mapping;
}

interface MappingStoreObject {
  _addDefault: () => any;
  add: () => any;
  remove: (id: number) => any;
  subscribe: Subscribe<MappingStore>;
}
