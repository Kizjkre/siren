type Apply = (attr: string) => any;

type ComponentAttrs = { [key: string]: any };

type ComponentAttrsCreator = (id: number) => ComponentAttrs;

type DirectiveFinder = (attr: string) => boolean;

type EventListenerSetter = (e: string, f: EventListener) => any;
