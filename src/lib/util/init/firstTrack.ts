import tracks from '$lib/stores/tracks';
import { get, type Readable } from 'svelte/store';
import { onMount } from 'svelte';
import type { TrackStore } from '$lib/util/definitions/tracks';

export const firstTrack: () => void = (): void => onMount((): any =>
  Object.keys(get(tracks as unknown as Readable<TrackStore>)).length < 1 &&
  tracks.add()
);

export default firstTrack;
