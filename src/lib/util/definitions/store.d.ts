import type { Invalidator, Subscriber, Unsubscriber } from 'svelte/store';

type Subscribe<T> = (run: Subscriber<T>, invalidate?: Invalidator<T>) => Unsubscriber;
