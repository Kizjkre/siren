import { type Writable, writable } from 'svelte/store';
import type { MappingStore, MappingStoreObject } from '$lib/util/definitions/mappings';

const store: Writable<MappingStore> = writable({});

const mappings: MappingStoreObject = {
  _addDefault: (): any => store.update((mappings: MappingStore): MappingStore => ({
    ...mappings,
    0: {
      name: writable('Default'),
      map: writable('export default x => x;')
    }
  })),
  add: (): any => store.update((mappings: MappingStore): MappingStore => ({
    ...mappings,
    [new Date().getTime()]: {
      name: writable('New Mapping'),
      map: writable('export default (x, i, arr) => {\n  return x;\n};')
    }
  })),
  remove: (id: number): any => store.update((mappings: MappingStore): MappingStore => {
    delete mappings[id];
    return mappings;
  }),
  subscribe: store.subscribe
};

export default mappings;
