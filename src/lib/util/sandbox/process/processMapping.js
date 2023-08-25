import mapping from '<URL>';

port.onmessage = e => port.postMessage(e.data.map(mapping));
