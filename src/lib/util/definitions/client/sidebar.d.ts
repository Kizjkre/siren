import { Subscribe } from '$lib/util/definitions/client/store';

interface SidebarStore {
  subscribe: Subscribe<boolean>;
  toggle: () => void
}
