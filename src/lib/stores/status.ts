import { type Writable, writable } from 'svelte/store';
import { Status } from '$lib/util/definitions/client/status.d';

const status: Writable<Status> = writable(Status.stop);

export default status;
