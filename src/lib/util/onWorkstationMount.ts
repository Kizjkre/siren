import { onDestroy, onMount } from 'svelte';
import { browser } from '$app/environment';
import { nodes } from '$lib/actions/clickOutside';
import sampleData from '$lib/util/sampleData';
import type { MouseEventHandler } from 'svelte/elements';

const onWorkstationMount: () => void = () => {
  const listener: MouseEventHandler<HTMLButtonElement> = (e: MouseEvent): void =>
    [...nodes.entries()].forEach(([node, callback]: [HTMLElement, () => any]): void => node !== e.target && callback());

  onMount((): void => {
    document.addEventListener('click', listener);
    sampleData();
  });

  onDestroy((): void => browser && document.removeEventListener('click', listener));
};

export default onWorkstationMount;
