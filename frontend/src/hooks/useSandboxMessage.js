export default (condition, action) => {
  const listener = e => {
    if (e.origin !== 'null' || !condition(e)) return;
    window.removeEventListener('message', listener);
    const [port] = e.ports;
    port.onmessage = e => {
      action(e, port);
      port.onmessage = null;
    };
  };

  return () => window.addEventListener('message', listener);
};
