import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { DSVRowArray } from 'd3-dsv';

const data: Writable<{ [name: string]: DSVRowArray<Columns> }> = writable({});

export default data;
