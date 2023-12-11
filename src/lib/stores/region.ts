import { get, type Writable, writable } from 'svelte/store';
import type { DSVRowAny, Region, RegionConstructor, RegionSource } from '$lib/util/definitions/client/region';
import data from '$lib/stores/data';

const region: RegionConstructor =
  ({ source = { id: -1, column: '' } }: RegionSource): Region => {
    const o: Writable<number> = writable(0);
    const d: Writable<any[]> = writable(
      get(data)[source.id].data
        .map((row: DSVRowAny): any => row[source.column])
        .filter((row: any): boolean => row !== null)
    );
    return {
      data: d,
      offset: o,
      source
    };
  };

export default region;
