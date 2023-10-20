import type { EventListenerCreator } from '$lib/util/definitions/listener';

/**
 * Creates a custom event with the given detail and returns it.
 *
 * @param {SandboxEventDetail} detail - The detail object to be included in the event.
 * @return {CustomEvent} The custom event with the specified detail.
 */
const sandboxEvent: SandboxEventCreator = (detail: SandboxEventDetail): CustomEvent =>
  new CustomEvent('siren-sandbox', { detail });

/**
 * Creates a custom event for the sandbox return.
 *
 * @param {string} name - The name of the event.
 * @param {any} detail - The detail of the event.
 * @return {CustomEvent} The custom event.
 */
const sandboxReturnEvent: SandboxReturnEventCreator = (name: string, detail: any): CustomEvent =>
  new CustomEvent(`siren-sandbox-return-${ name }`, { detail });

/**
 * Executes a sandbox event.
 *
 * @param {string} name - The name of the event.
 * @param {SandboxMessage} message - The message to be dispatched.
 * @return {any} - The result of the event execution.
 */
export const useSandbox: SandboxEvent = (name: string, message: SandboxMessage): any =>
  document.dispatchEvent(sandboxEvent({ action: '', data: null, name, script: '', ...message }));

/**
 * Emits a return event with the given name and data.
 *
 * @param {string} name - The name of the return event.
 * @param {any} data - The data to be sent with the return event.
 * @return {any} - The return value of the function.
 */
export const emitReturn: SandboxReturnEvent = (name: string, data: any): any =>
  document.dispatchEvent(sandboxReturnEvent(name, data));

/**
 * Creates an event listener for the 'sandbox-return' event with the specified name and callback.
 *
 * @param {string} name - The name of the event.
 * @param {SandboxReturnEventCallback} callback - The callback function to be executed when the event is triggered.
 * @return {any} The return value of the function.
 */
export const onSandboxReturn: EventListenerCreator<[string, SandboxReturnEventCallback]> =
  (name: string, callback: SandboxReturnEventCallback): any => {
    const listener: EventListener = (e: CustomEventInit): void => {
      document.removeEventListener(`siren-sandbox-return-${ name }`, listener);
      callback(e);
    };

    document.addEventListener(`siren-sandbox-return-${ name }`, listener);
  };
