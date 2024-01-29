import type { Writable } from 'svelte/store';
import type { Types } from '$lib/util/definitions/types';

interface DSVRowAny {
  [key: string]: any;
}

interface Region {
  data: Writable<any[]>;
  offset: Writable<number>;
  source: { id: number, column: string };
  type: Writable<Types>;
}

interface RegionSource {
  source: { id: number, column: string };
  offset?: number;
}

type RegionConstructor = ({ source }: RegionSource) => Region;
