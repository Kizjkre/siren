import { Subscriber, Writable } from 'svelte/store';
import type { Region } from '$lib/util/definitions/region';

interface TrackRegionStore {
  add: (parameter: string, config: { source: { id: number, column: string } } ) => void;
  subscribe: Subscriber<Subscriber<DefaultDict<{ [id: number]: Region }>>>;
}

interface TrackRegion {
  timbral: TrackRegionStore;
  time: TrackRegionStore;
}

interface Track {
  name: Writable<string>;
  regions: TrackRegion;
}

interface TrackStore {
  [id: number]: Track;
}

interface TrackStoreObject {
  add: () => void;
  remove: (id: number) => void;
  subscribe: Subscriber<Subscriber<TrackStore>>;
}
