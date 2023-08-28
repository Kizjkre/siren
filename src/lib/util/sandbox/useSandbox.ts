import type { EventListenerCreator } from '$lib/util/definitions/listener';

const sandboxEvent: SandboxEventCreator = (detail: SandboxEventDetail): CustomEvent =>
  new CustomEvent('siren-sandbox', { detail });

const sandboxReturnEvent: SandboxReturnEventCreator = (name: string, detail: any): CustomEvent =>
  new CustomEvent(`siren-sandbox-return-${ name }`, { detail });

export const createSandbox: SandboxEvent = (name: string, script: string, process: string, data: any = true): any =>
  document.dispatchEvent(sandboxEvent({ script, data, name, process }));

export const emitReturn: SandboxReturnEvent = (name: string, data: any): any =>
  document.dispatchEvent(sandboxReturnEvent(name, data));

export const onSandboxReturn: EventListenerCreator<[string, SandboxReturnEventCallback]> =
  (name: string, callback: SandboxReturnEventCallback): any => {
    const listener: EventListener = (e: CustomEventInit): void => {
      document.removeEventListener(`siren-sandbox-return-${ name }`, listener);
      callback(e);
    };

    document.addEventListener(`siren-sandbox-return-${ name }`, listener);
  };
