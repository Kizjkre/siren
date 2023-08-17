import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

const sidebar: Writable<boolean> = writable(true);

export default sidebar;
