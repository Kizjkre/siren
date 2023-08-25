const sandboxEvent: SandboxEventCreator = (detail: SandboxEventDetail): CustomEvent =>
  new CustomEvent('siren-sandbox', { detail });

const sandboxReturnEvent: SandboxReturnEventCreator = (name: string, detail: any): CustomEvent =>
  new CustomEvent(`siren-sandbox-return-${ name }`, { detail });

export const emit: SandboxEvent = (name: string, script: string, process: string, data: any = true): any =>
  document.dispatchEvent(sandboxEvent({ script, data, name, process }));

export const emitReturn: SandboxReturnEvent = (name: string, data: any): any =>
  document.dispatchEvent(sandboxReturnEvent(name, data));
