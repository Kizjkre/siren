import { DSVParsedArray } from 'd3-dsv';
import { Subscriber } from 'svelte/store';

interface DataStore {
  [id: number]: {
    name: string,
    data: DSVParsedArray<any>;
  }
}

interface DataStoreObject {
  add: (name: string, map: string) => number;
  remove: (id: number) => void;
  subscribe: Subscriber<Subscriber<DataStore>>;
}
