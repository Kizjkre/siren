import mapping from '#userscript';
import port from '#port';

const listener = async e => {
  (await port).postMessage({ action: 'close', payload: e.data.map(mapping).filter(d => d !== null) });
  (await port).removeEventListener('message', listener);
};

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).addEventListener('message', listener);
