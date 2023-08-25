import { type Writable, writable } from 'svelte/store';
import type { Subscribe } from '$lib/util/definitions/store';

const { subscribe, update }: Writable<boolean> = writable(true);

const sidebar: {
  subscribe: Subscribe<boolean>,
  toggle: () => void
} = {
  subscribe,
  toggle: (): void => update((v: boolean): boolean => !v)
};

export default sidebar;
