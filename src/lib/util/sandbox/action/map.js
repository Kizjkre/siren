import mapping from '#userscript';
import port from '#port';

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).onmessage = async e => (await port).postMessage(e.data.map(mapping));
