const port = await new Promise(resolve => {
  const listener = e => {
    window.removeEventListener('message', listener);
    const [p] = e.ports;

    resolve(p);
  }

  window.addEventListener('message', listener);
});

export default port;
