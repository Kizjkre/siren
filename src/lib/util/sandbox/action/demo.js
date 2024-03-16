import * as synth from '#userscript';
import port from '#port';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const urls = Object.fromEntries(Object.entries(synth.worklets ?? {}).map(([name, worklet]) => {
  const blob = new Blob([`registerProcessor('${ name }', ${ worklet.toString() });`], { type: 'application/javascript' });
  return [name, URL.createObjectURL(blob)];
}));

const addModule = AudioWorklet.prototype.addModule;
AudioWorklet.prototype.addModule = async function (...args) {
  args[0] = urls[args[0]];
  return await addModule.apply(this, args);
};

const context = new AudioContext();

const s = await synth.default(context, context.destination);
[...s.updates.values()].forEach(func => func(undefined, 0));
s.start();

await sleep(1000);

s.stop();

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).postMessage({ action: 'close', payload: null });
