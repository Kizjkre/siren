import type { Subscribe } from '$lib/util/definitions/store';
import type { Writable } from 'svelte/store';

interface Sandbox {
  action: string;
  data?: Writable<any>;
  result?: any;
  scripts: { [id: string]: string };
}

interface SandboxStore {
  [id: string]: Sandbox;
}

interface SandboxStoreInterface {
  add:  {
    (id: string, sandbox: Sandbox): SandboxStoreInterface;
    (sandbox: Sandbox): SandboxStoreInterface;
  };
  read: (id: string, action: string | undefined, remove: boolean = true) => Promise<any>;
  remove: (id: string) => any;
  result: (id: string, result: any) => any;
  send: (id: string, data: any) => any;
  subscribe: Subscribe<SandboxStore>;
}
