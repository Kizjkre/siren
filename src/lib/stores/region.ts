import { get, type Writable, writable } from 'svelte/store';
import type { DSVRowAny, Region, RegionConstructor, RegionSource } from '$lib/util/definitions/region';
import data from '$lib/stores/data';
import { type } from '$lib/util/types';

const region: RegionConstructor =
  ({ source = { id: -1, column: '' }, offset }: RegionSource): Region => {
    const o: Writable<number> = writable(!offset || (isNaN(offset) || offset < 0) ? 0 : offset);
    const d: Writable<any[]> = writable(
      get(data)[source.id].data
        .map((row: DSVRowAny): any => row[source.column])
        .filter((row: any): boolean => row !== null)
    );
    return {
      data: d,
      offset: o,
      source,
      type: writable(type(get(d)))
    };
  };

export default region;
