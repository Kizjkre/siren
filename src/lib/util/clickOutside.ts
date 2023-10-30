import { nodes } from '$lib/actions/clickOutside';
import type { MouseEventHandler } from 'svelte/elements';

const clickOutsideListener: MouseEventHandler<Document> = (e: MouseEvent): void =>
  [...nodes.entries()].forEach(([node, callback]: [HTMLElement, MouseEventHandler<HTMLElement>]): any =>
    node !== e.target && callback({
      ...e,
      currentTarget: node as HTMLButtonElement
    })
  );

export default clickOutsideListener;
