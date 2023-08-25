interface SandboxEventDetail {
  script: string;
  data: any;
  name: string;
  process: string;
}

type SandboxEvent = (name: string, script: string, process: string, data?: any) => any;
type SandboxEventCreator = (detail: SandboxEventDetail) => CustomEvent;
type SandboxReturnEvent = (name: string, data: any) => any;
type SandboxReturnEventCreator = (name: string, detail: any) => CustomEvent;
