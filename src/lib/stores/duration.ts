import { type Writable, writable } from 'svelte/store';

const duration: Writable<number> = writable(128);

export default duration;
