import type { Writable } from 'svelte/store';

interface DSVRowAny {
  [key: string]: any;
}

interface Region {
  data: Writable<any[]>;
  offset: Writable<number>;
  source: { id: number, column: string };
}

interface RegionSource {
  source: { id: number, column: string };
}

type RegionConstructor = ({ source }: RegionSource) => Region;
