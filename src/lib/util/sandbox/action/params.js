import { parameters } from '#userscript';
import port from '#port';

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).postMessage(parameters);
