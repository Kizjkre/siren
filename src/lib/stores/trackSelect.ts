import { type Writable, writable } from 'svelte/store';

const trackSelect: Writable<number> = writable(-1);

export default trackSelect;
