import type { Writable } from 'svelte/store';

interface Region {
  offset: Writable<number>;
  source: { id: number, column: string };
}
