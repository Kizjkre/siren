// @ts-ignore
import coral from '$lib/assets/data/coral_data.csv?raw';
import data from '$lib/stores/data';
import { get } from 'svelte/store';
import { onMount } from 'svelte';

let id: number;

export const sampleData: Function = (): void => onMount((): any =>
  !(id in get(data)) && (id = data.add('coral_data.csv', coral))
);

export default sampleData;
