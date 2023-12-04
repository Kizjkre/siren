import type { Subscribe } from '$lib/util/definitions/client/store';

interface Sandbox {
  action: string;
  data: any;
  result?: any;
  script: string;
}

interface SandboxStore {
  [id: string]: Sandbox;
}

interface SandboxStoreInterface {
  add:  {
    (id: string, sandbox: Sandbox): any;
    (sandbox: Sandbox): any;
  };
  read: (id: string) => Promise<any>;
  remove: (id: string) => any;
  result: (id: string, result: any) => any;
  send: (id: string, data: any) => any;
  subscribe: Subscribe<SandboxStore>;
}
