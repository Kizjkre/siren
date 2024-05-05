import type { EventHandler } from 'svelte/elements';

type EventListenerCreator<T extends []> = (...args: T) => EventListener;

type EventHandlerCreator<A extends [], E extends EventHandler<any>> = (...args: A) => E;
