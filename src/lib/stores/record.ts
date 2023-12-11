import { type Writable, writable } from 'svelte/store';
import type { Socket } from 'socket.io-client';

const record: Writable<Socket> = writable();

export default record;
