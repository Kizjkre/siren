import type { Action, ActionReturn } from 'svelte/action';
import type { MouseEventHandler } from 'svelte/elements';

export const nodes: Map<HTMLElement, MouseEventHandler<HTMLButtonElement>> = new Map();

const clickOutside: Action = (node: HTMLElement, callback:  MouseEventHandler<HTMLButtonElement>): ActionReturn => {
  nodes.set(node, callback);

  return {
    destroy: (): void => nodes.delete(node)
  }
};

export default clickOutside;
