import { type Writable, writable } from 'svelte/store';

const width: Writable<number> = writable(100);

export default width;
