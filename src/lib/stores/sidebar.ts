import { type Writable, writable } from 'svelte/store';
import type { SidebarStore } from '$lib/util/definitions/client/sidebar';

const { subscribe, update }: Writable<boolean> = writable(true);

const sidebar: SidebarStore = {
  subscribe,
  toggle: (): void => update((v: boolean): boolean => !v)
};

export default sidebar;
