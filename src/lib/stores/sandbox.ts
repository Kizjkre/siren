import { type Unsubscriber, type Writable, writable } from 'svelte/store';
import type { Sandbox, SandboxStore, SandboxStoreInterface } from '$lib/util/definitions/client/sandbox';

const { subscribe, update }: Writable<SandboxStore> = writable({});

const sandbox: SandboxStoreInterface = {
  /**
   * Adds a new sandbox to the store.
   *
   * @param {string | Sandbox} idOrSandbox - The ID or the sandbox object to be added.
   * @param {Sandbox} [s] - The sandbox object to be added, if an ID is provided.
   * @return {any} Returns nothing.
   */
  add: (idOrSandbox: string | Sandbox, s?: Sandbox): any => {
    let id: string | null = null;
    const time: number = new Date().getTime();
    if (s) id = idOrSandbox as string;
    else {
      s = idOrSandbox as Sandbox;

      const unsub: Unsubscriber = subscribe((sandboxes: SandboxStore): any => {
        if (sandboxes[time]?.result) {
          sandbox.remove('' + time);
          unsub();
        }
      });
    }
    update((store: SandboxStore): SandboxStore => {
      store[id ?? time] = s!;
      return store;
    });
  },
  /**
   * Reads the result of a sandbox with the given ID.
   *
   * @param {string} id - The ID of the sandbox.
   * @return {Promise<any>} A promise that resolves with the result of the sandbox.
   */
  read: (id: string): Promise<any> => new Promise((resolve: any) => {
    const unsub: Unsubscriber = subscribe((sandboxes: SandboxStore): any => {
      if (sandboxes[id]?.result) {
        const result: any = sandboxes[id].result;
        sandbox.remove(id);
        unsub();
        resolve(result);
      }
    });
  }),
  /**
   * Removes an item from the SandboxStore based on its ID.
   *
   * @param {string} id - The ID of the item to be removed.
   * @return {any} The updated SandboxStore after the item is removed.
   */
  remove: (id: string): any => update((store: SandboxStore): SandboxStore => {
    delete store[id];
    return store;
  }),
  /**
   * Updates the store with the provided result for the given id.
   *
   * @param {string} id - The id of the store to be updated.
   * @param {any} result - The result to be stored in the store.
   * @return {any} The updated store.
   */
  result: (id: string, result: any): any => update((store: SandboxStore): SandboxStore => {
    store[id].result = result;
    return store;
  }),
  /**
   * Updates the store with the provided data for the given id.
   *
   * @param {string} id - The id of the store to update.
   * @param {any} data - The data to update the store with.
   * @return {any} The updated store.
   */
  send: (id: string, data: any): any => update((store: SandboxStore): SandboxStore => {
    store[id].data = data;
    return store;
  }),
  subscribe
};

export default sandbox;
