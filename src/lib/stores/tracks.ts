import { get, type Writable, writable } from 'svelte/store';
import track from '$lib/stores/track';
import type { TrackRegionStore, TrackStore, TrackStoreInterface } from '$lib/util/definitions/tracks';
import type { Region } from '$lib/util/definitions/region';
import data from '$lib/stores/data';
import synths from '$lib/stores/synths';

const store: Writable<TrackStore> = writable<TrackStore>({});

const tracks: TrackStoreInterface = {
  add: (): any =>
    store.update((tracks: TrackStore): TrackStore => ({ ...tracks, [new Date().getTime()]: track() })),
  remove: (id: number): any => store.update((tracks: TrackStore): TrackStore => {
    Object.values(get(tracks[id].regions.timbral)).forEach((regions: TrackRegionStore): any =>
      Object.values(regions).forEach((region: Region): any =>
        get(data)[region.source.id].references.update((refs: number): number => refs - 1)
      )
    );

    get(synths)[get(tracks[id].synth)].references.update((refs: number): number => refs - 1)

    delete tracks[id];
    return tracks;
  }),
  subscribe: store.subscribe
};

export default tracks;
