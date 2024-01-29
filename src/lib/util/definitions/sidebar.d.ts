import { Subscribe } from '$lib/util/definitions/store';

interface SidebarStore {
  subscribe: Subscribe<boolean>;
  toggle: () => void
}
