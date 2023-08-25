let port;

const message = module => {
  const listener = e => {
    window.removeEventListener('message', listener);
    [port] = e.ports;

    module();
  }

  window.addEventListener('message', listener);
};
