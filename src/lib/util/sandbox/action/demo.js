import synth from '#userscript';
import port from '#port';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const s = await synth();
s.start();

await sleep(1000);

s.stop();

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).postMessage(true);
