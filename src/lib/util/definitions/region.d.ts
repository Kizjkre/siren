import type { Writable } from 'svelte/store';
import type { Types } from '$lib/util/definitions/types';

interface DSVRowAny {
  [key: string]: any;
}

interface Region {
  data: Writable<any[]>;
  length: Writable<number>;
  link?: Writable<number>;
  offset: Writable<number>;
  source: { id: number, column: string };
  type: Writable<Types>;
}

interface RegionSource {
  link?: number;
  offset?: number;
  source: { id: number, column: string };
}

type RegionConstructor = ({ source }: RegionSource) => Region;
