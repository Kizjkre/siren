import type { Writable } from 'svelte/store';
import type { Region, RegionSource } from '$lib/util/definitions/region';
import type { Subscribe } from '$lib/util/definitions/store';

interface TrackRegionStoreStructure {
  [id: number]: Region;
}

interface TrackRegionStore {
  add: (parameter: string, config: RegionSource ) => any;
  remove: (parameter: string, id: number) => any;
  subscribe: Subscribe<DefaultDict<TrackRegionStoreStructure>>;
}

interface TrackRegion {
  timbral: TrackRegionStore;
  time: TrackRegionStore;
}

interface Track {
  name: Writable<string>;
  regions: TrackRegion;
  synth: Writable<number>;
}

interface TrackStore {
  [id: number]: Track;
}

interface TrackStoreObject {
  add: () => void;
  remove: (id: number) => any;
  subscribe: Subscribe<TrackStore>;
}
