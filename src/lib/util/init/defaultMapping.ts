import { onMount } from 'svelte';
import { get, type Readable, type Writable } from 'svelte/store';
import mappings from '$lib/stores/mappings';
import type { MappingStore } from '$lib/util/definitions/mappings';

const defaultMapping: () => void = () => onMount((): any => {
  const exists: boolean = Object.values(get(mappings as unknown as Readable<MappingStore>)).some(
    ({ name }: { name: Writable<string> }): boolean => get(name) === 'Default'
  );

  if (exists) return;

  mappings._addDefault();
});

export default defaultMapping;
