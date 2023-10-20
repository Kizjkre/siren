type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

interface SandboxEventDetail {
  action: string;
  data: any;
  name: string;
  script: string;
}

interface SandboxStore {
  [id: string]: SandboxEventDetail;
}

type SandboxEvent = (name: string, message: SandboxMessage) => any;
type SandboxEventCreator = (detail: SandboxEventDetail) => CustomEvent;
type SandboxMessage = AtLeastOne<{
  action: string;
  data: any;
  script: string;
}>;
type SandboxReturnEvent = (name: string, data: any) => any;
type SandboxReturnEventCallback = (e: CustomEventInit) => any;
type SandboxReturnEventCreator = (name: string, detail: any) => CustomEvent;
