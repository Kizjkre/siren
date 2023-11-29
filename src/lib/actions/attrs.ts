import type { Action, ActionReturn } from 'svelte/action';

// REF: https://github.com/sveltejs/svelte/issues/5112#issuecomment-671019753
const attrs: Action<HTMLElement, ComponentAttrs> = (node: HTMLElement, attrs: ComponentAttrs): ActionReturn<ComponentAttrs> => {
  const attrKeys: string[] = Object.keys(attrs);

  const addEvt: EventListenerSetter = (e: string, f: EventListener): void => node.addEventListener(e, f);
  const remEvt: EventListenerSetter = (e: string, f: EventListener): void => node.removeEventListener(e, f);

  const onEvents: DirectiveFinder = (attr: string): boolean => attr.startsWith('on:');
  const classes: DirectiveFinder = (attr: string): boolean => attr.startsWith('class:');
  const others: DirectiveFinder = (attr: string): boolean => !attr.startsWith('on:');

  const setup: Apply =
    (attr: string): any => addEvt(attr.substr(3), (attrs[attr] as EventListener));
  const teardown: Apply =
    (attr: string): any => remEvt(attr.substr(3), (attrs[attr] as EventListener));

  const apply: Apply = (attrName: string): any => (node as HTMLElement & ComponentAttrs)[attrName] = attrs[attrName];

  const addClass: Apply = (c: string): void => node.classList.add(c.substring(6));
  const removeClass: Apply = (c: string): void => node.classList.remove(c.substring(6));

  attrKeys.filter(onEvents).forEach(setup);
  attrKeys.filter(others).forEach(apply);
  attrKeys.filter(classes).forEach(addClass);

  return {
    update: (attrs: ComponentAttrs): any => {
      const attrKeys: string[] = Object.keys(attrs);
      attrKeys.filter(onEvents).forEach(teardown);
      attrKeys.filter(onEvents).forEach(setup);
      attrKeys.filter(others).forEach(apply);
      attrKeys.filter(classes).forEach(removeClass);
      attrKeys.filter(classes).forEach(addClass);
    },
    destroy: (): any => attrKeys.filter(onEvents).map(teardown)
  };
};

export default attrs;
