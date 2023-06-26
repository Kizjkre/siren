const run = (name, mapping, port) => {
  port.postMessage({ name });

  port.onmessage = e => {
    if (e.data.action !== 'run') return;

    port.postMessage({ data: e.data.data.map(mapping).filter(d => d !== null) });
  };
};

export default run.toString();
