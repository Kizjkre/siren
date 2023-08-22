import { type Writable, writable } from 'svelte/store';
import type { Region } from '$lib/util/definitions/region';

const region: ({ source }: { source: { id: number, column: string } }) => Region =
  ({ source = { id: -1, column: '' } }: { source: { id: number, column: string } }): Region => {
    const o: Writable<number> = writable(0);
    return {
      offset: o,
      source
    };
  };

export default region;
