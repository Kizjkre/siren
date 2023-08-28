import { type Writable, writable } from 'svelte/store';
import { Status } from '$lib/util/definitions/status';

const status: Writable<Status> = writable(Status.stop);

export default status;
