import type { DSVParsedArray } from 'd3-dsv';
import type { Writable } from 'svelte/store';
import type { Subscribe } from '$lib/util/definitions/store';

interface DataStore {
  [id: number]: {
    name: string;
    data: DSVParsedArray<any>;
    references: Writable<number>
  }
}

interface DataStoreObject {
  add: (name: string, map: string) => any;
  remove: (id: number) => any;
  subscribe: Subscribe<DataStore>
}
