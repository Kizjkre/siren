import synth from '#userscript';
import port from '#port';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const s = await synth();
s.start();

await sleep(1000);

s.stop();

port.postMessage(null);
