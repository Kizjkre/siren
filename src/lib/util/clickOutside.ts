import { nodes } from '$lib/actions/clickOutside';
import type { MouseEventHandler } from 'svelte/elements';

const clickOutsideListener: MouseEventHandler<HTMLButtonElement> = (e: MouseEvent): void =>
  [...nodes.entries()].forEach(([node, callback]: [HTMLElement, MouseEventHandler<HTMLButtonElement>]): any =>
    node !== e.target && callback({
      ...e,
      currentTarget: node as HTMLButtonElement
    })
  );

export default clickOutsideListener;
