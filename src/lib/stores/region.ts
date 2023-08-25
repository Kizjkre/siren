import { get, type Writable, writable } from 'svelte/store';
import type { Region, RegionConstructor, RegionSource } from '$lib/util/definitions/region';
import data from '$lib/stores/data';

const region: RegionConstructor =
  ({ source = { id: -1, column: '' } }: RegionSource): Region => {
    const o: Writable<number> = writable(0);
    const d: Writable<any[]> = writable(get(data)[source.id].data.map((row: any): number =>
      +(row[source.column] || 0)
    ));
    return {
      data: d,
      offset: o,
      source
    };
  };

export default region;
