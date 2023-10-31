import { get, type Writable, writable } from 'svelte/store';
import track from '$lib/stores/track';
import type { TrackRegionStoreStructure, TrackStore, TrackStoreObject } from '$lib/util/definitions/tracks';
import type { Region } from '$lib/util/definitions/region';
import data from '$lib/stores/data';

const store: Writable<TrackStore> = writable({});

const tracks: TrackStoreObject = {
  add: (): any =>
    store.update((tracks: TrackStore): TrackStore => ({ ...tracks, [new Date().getTime()]: track() })),
  remove: (id: number): any => store.update((tracks: TrackStore): TrackStore => {
    Object.values(get(tracks[id].regions.timbral)).forEach((regions: TrackRegionStoreStructure): any =>
      Object.values(regions).forEach((region: Region): any =>
        get(data)[region.source.id].references.update((refs: number): number => refs - 1)
      )
    );

    delete tracks[id];
    return tracks;
  }),
  subscribe: store.subscribe
};

export default tracks;
