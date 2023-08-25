import tracks from '$lib/stores/tracks';
import { get } from 'svelte/store';
import { onMount } from 'svelte';

export const firstTrack: Function = (): void => onMount((): any =>
  Object.keys(get(tracks)).length < 1 && tracks.add()
);

export default firstTrack;
