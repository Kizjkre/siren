import type { EventHandler } from 'svelte/elements';

type Apply = (attr: string) => any;

type ComponentAttrs = { [key: string]: boolean | EventHandler | string };

type ComponentAttrsCreator = (id: number) => ComponentAttrs;

type DirectiveFinder = (attr: string) => boolean;

type EventListenerSetter = (e: string, f: EventListener) => any;
