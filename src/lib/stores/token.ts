import { type Writable, writable } from 'svelte/store';

const token: Writable<string> = writable();

export default token;
