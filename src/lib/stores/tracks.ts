import { type Writable, writable } from 'svelte/store';
import track from '$lib/stores/track';
import type { TrackStore, TrackStoreObject } from '$lib/util/definitions/tracks';

const store: Writable<TrackStore> = writable({});

const tracks: TrackStoreObject = {
  add: (): void =>
    store.update((tracks: TrackStore): TrackStore => ({ ...tracks, [new Date().getTime()]: track() })),
  remove: (id: number) => store.update((tracks: TrackStore): TrackStore => {
    delete tracks[id];
    return tracks;
  }),
  subscribe: store.subscribe
};

export default tracks;
