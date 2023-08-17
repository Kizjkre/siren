import { onDestroy, onMount } from 'svelte';
import { browser } from '$app/environment';

export const nodes: Map<HTMLElement, () => any> = new Map();

const onWorkstationMount: () => void = () => {
  const listener: EventListener = (e: MouseEvent): void =>
    [...nodes.entries()].forEach(([node, callback]: [HTMLElement, () => any]): void => node !== e.target && callback());

  onMount((): void => document.addEventListener('click', listener));

  onDestroy((): void => browser && document.removeEventListener('click', listener));
};

export default onWorkstationMount;
