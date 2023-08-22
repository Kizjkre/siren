import { type Writable, writable } from 'svelte/store';

const duration: Writable<number> = writable(32);

export default duration;
