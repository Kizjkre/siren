const run = (name, mapping, port) => {
  port.postMessage({ name });

  port.onmessage = e => {
    console.log(e.data);
    if (e.data.action !== 'run') return;
    console.log(mapping);

    port.postMessage({ data: e.data.data.map(mapping) });
  };
};

export default run.toString();
