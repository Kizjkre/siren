import mapping from '#userscript';
import port from '#port';

port.onmessage = e => port.postMessage(e.data.map(mapping));
