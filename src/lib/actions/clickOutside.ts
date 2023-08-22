import type { Action, ActionReturn } from 'svelte/action';
import type { MouseEventHandler } from 'svelte/elements';

export const nodes: Map<HTMLElement, MouseEventHandler<HTMLElement>> = new Map();

const clickOutside: Action<HTMLElement, MouseEventHandler<HTMLElement>> =
  (node: HTMLElement, callback: MouseEventHandler<HTMLElement>): ActionReturn<MouseEventHandler<HTMLElement>> => {
    nodes.set(node, callback);

    return {
      destroy: (): boolean => nodes.delete(node)
    }
  };

export default clickOutside;
