import { onMount } from 'svelte';
import { get } from 'svelte/store';
import mappings from '$lib/stores/mappings';

const defaultMapping: Function = (): any => onMount((): any =>
  !(0 in get(mappings)) && mappings._addDefault()
);

export default defaultMapping;
