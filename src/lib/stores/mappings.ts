import { type Writable, writable } from 'svelte/store';
import type { MappingStore, MappingStoreObject } from '$lib/util/definitions/mappings';

const store: Writable<MappingStore> = writable({});

const mappings: MappingStoreObject = {
  /**
   * Adds a default mapping to the store.
   *
   * @return {any} The updated mapping store.
   */
  _addDefault: (): any => store.update((mappings: MappingStore): MappingStore => ({
    ...mappings,
    0: {
      name: writable('Default'),
      map: writable('export default x => x;')
    }
  })),
  /**
   * Adds a new mapping to the store.
   *
   * @return {any} The updated mapping store.
   */
  add: (): any => store.update((mappings: MappingStore): MappingStore => ({
    ...mappings,
    [new Date().getTime()]: {
      name: writable('New Mapping'),
      map: writable('export default (x, i, arr) => {\n  return x;\n};')
    }
  })),
  /**
   * Removes an item from the mappings store.
   *
   * @param {number} id - The ID of the item to be removed.
   * @return {any} The updated mappings store after the item is removed.
   */
  remove: (id: number): any => store.update((mappings: MappingStore): MappingStore => {
    delete mappings[id];
    return mappings;
  }),
  subscribe: store.subscribe
};

export default mappings;
