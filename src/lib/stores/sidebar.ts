import { type Subscriber, type Writable, writable } from 'svelte/store';

const { subscribe, update }: Writable<boolean> = writable(true);

const sidebar: {
  subscribe: Subscriber<Subscriber<boolean>>,
  toggle: () => void
} = {
  subscribe,
  toggle: (): void => update((v: boolean): boolean => !v)
};

export default sidebar;
