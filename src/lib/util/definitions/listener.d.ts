import type { EventHandler } from 'svelte/elements';

type EventListenerCreator<T extends Array> = (...args: T) => EventListener;

type EventHandlerCreator<A extends Array, E extends EventHandler<any>> = (...args: A) => E;
