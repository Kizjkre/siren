import { type Writable, writable } from 'svelte/store';
import type { DataStore, DataStoreObject } from '$lib/util/definitions/data';
import { autoType, csvParse } from 'd3-dsv';

const store: Writable<DataStore> = writable({});

const data: DataStoreObject = {
  add: (name: string, csv: string): number => {
    const id: number = new Date().getTime();

    store.update((data: DataStore): DataStore => ({
      ...data,
      [id]: {
        name,
        data: csvParse(csv, autoType)
      }
    }));

    return id;
  },
  remove: (id: number) => store.update((data: DataStore): DataStore => {
    delete data[id];
    return data;
  }),
  subscribe: store.subscribe
};

export default data;
