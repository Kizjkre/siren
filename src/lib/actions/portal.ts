// REF: https://github.com/romkor/svelte-portal/blob/a650e7b762344a1bb0ad9e218660ed1ee66e3f90/src/Portal.svelte

import { tick } from 'svelte';
import type { Action, ActionReturn } from 'svelte/action';

/**
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 *
 * @param { HTMLElement } el
 * @param { HTMLElement | string } target DOM Element or CSS Selector
 */
const portal: Action<HTMLElement, HTMLElement> = (el: HTMLElement, target?: string | HTMLElement): ActionReturn<HTMLElement> => {
  target ??= document.body.firstElementChild as HTMLElement;

  let targetEl: HTMLElement | null;
  const update: ActionReturn<any>['update'] = async (newTarget: string | HTMLElement): Promise<void> => {
    target = newTarget;
    if (typeof target === 'string') {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${ target }"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${ target === null ? 'null' : typeof target }. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    targetEl.appendChild(el);
    el.hidden = false;
  };

  const destroy: ActionReturn<any>['destroy'] = (): any =>
    el.parentNode && el.parentNode.removeChild(el);

  // noinspection JSIgnoredPromiseFromCall
  update(target);

  return {
    update,
    destroy
  };
};

export default portal;
