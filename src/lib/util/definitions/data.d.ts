import type { DSVParsedArray } from 'd3-dsv';
import type { Writable } from 'svelte/store';
import type { Subscribe } from '$lib/util/definitions/store';

interface Data {
  name: string;
  data: DSVParsedArray<any>;
  references: Writable<number>;
}

interface DataStore {
  [id: number]: Data;
}

interface DataStoreInterface {
  add: (name: string, map: string) => any;
  remove: (id: number) => any;
  subscribe: Subscribe<DataStore>;
}
