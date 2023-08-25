type PortDispatcher = (port: MessagePort) => CustomEvent;

const portDispatcher: PortDispatcher = (port: MessagePort): CustomEvent =>
  new CustomEvent('siren-port', { detail: port });

export default portDispatcher;
