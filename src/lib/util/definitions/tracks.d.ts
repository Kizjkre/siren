import type { Writable } from 'svelte/store';
import type { Region, RegionSource } from '$lib/util/definitions/region';
import type { Subscribe } from '$lib/util/definitions/store';

interface TrackRegionStore {
  [id: number]: Region;
}

interface TrackRegionStoreInterface {
  add: (parameter: string, config: RegionSource ) => any;
  remove: (parameter: string, id: number) => any;
  subscribe: Subscribe<DefaultDict<TrackRegionStore>>;
}

interface TrackRegion {
  timbral: TrackRegionStoreInterface;
  time: TrackRegionStoreInterface;
}

interface Track {
  name: Writable<string>;
  regions: TrackRegion;
  synth: Writable<number>;
  view: Writable<string>;
}

interface TrackStore {
  [id: number]: Track;
}

interface TrackStoreInterface {
  add: () => void;
  remove: (id: number) => any;
  subscribe: Subscribe<TrackStore>;
}
