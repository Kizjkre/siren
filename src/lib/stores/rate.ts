import { type Writable, writable } from 'svelte/store';

const rate: Writable<number> = writable(1);

export default rate;
