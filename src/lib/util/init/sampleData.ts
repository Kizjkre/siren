// @ts-ignore
import coral from '$lib/assets/data/coral_data.csv?raw';
import data from '$lib/stores/data';
import { get, type Readable } from 'svelte/store';
import { onMount } from 'svelte';
import type { DataStore } from '$lib/util/definitions/data';

let id: number;

export const sampleData: () => void = (): void => onMount((): any =>
  !(id in get(data as unknown as Readable<DataStore>)) &&
  (id = data.add('coral_data.csv', coral))
);

export default sampleData;
