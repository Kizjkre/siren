import port from '#port';

const context = new AudioContext();
context.suspend();

const synths = await Promise.all(
  [...document.getElementsByTagName('script')]
    .filter(e => e.id.includes('userscript-'))
    .map(async e => await import(e.src))
);

const graph = new Map();

const connect = AudioNode.prototype.connect;
const disconnect = AudioNode.prototype.disconnect;
const addModule = AudioWorklet.prototype.addModule;

AudioNode.prototype.connect = function () {
  if (!graph.has(this.context)) {
    graph.set(this.context, new Set());
  }
  graph.get(this.context).add([this, arguments[0]]);
  return connect.apply(this, arguments);
};
AudioNode.prototype.disconnect = function () {
  graph.get(this.context).delete([this, arguments[0]]);
  return disconnect.apply(this, arguments);
};

const res = synths.map(synth => {
  const urls = Object.fromEntries(Object.entries(synth.worklets ?? {}).map(([name, worklet]) => {
    const blob = new Blob([`registerProcessor('${ name }', ${ worklet.toString() });`], { type: 'application/javascript' });
    return [name, URL.createObjectURL(blob)];
  }));

  AudioWorklet.prototype.addModule = async function () {
    arguments[0] = urls[arguments[0]];
    return await addModule.apply(this, arguments);
  };

  const gain = new GainNode(context);
  const control = new GainNode(context);
  connect.call(gain, control);
  connect.call(gain, context.destination);
  control.gain.value = 1 / synths.length;

  const s = synth.default(context);
  graph.get(context)?.forEach(([from, to]) => {
    if (to instanceof AudioDestinationNode) {
      disconnect.call(from, to);
      connect.call(from, gain);
    }
  });
  graph.delete(context);

  return [synth, s, gain];
});

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).onmessage = async e => {
  switch (e.data.action) {
    case 'play':
      // noinspection ES6MissingAwait
      res.forEach(async ([synth, s, gain], i) => {
        s = await s;

        let current = {};
        Object.keys(e.data.timeline[i])
          .sort((a, b) => +a - +b)
          .forEach(time => {
            current = { ...current, ...e.data.timeline[i][time] };
            const functions = new Map();
            Object.keys(e.data.timeline[i][time]).forEach(parameter =>
              Array.from(s.updates.keys())
                .filter(params => params.includes(parameter))
                .forEach(params => !functions.has(params) && functions.set(params, s.updates.get(params)))
            );

            // if (functions.size === 0) [...s.updates.values()].forEach(fun => functions.set([undefined, time], fun)); /* NOTE: Might be hacky */
            Array.from(functions.entries()).forEach(([params, update]) => update(...params.filter(p => !synth.parameters.time.includes(p)).map(p => current[p]), +time)); /* TODO: fix hack */
          });

        (await port).postMessage({ action: 'start', payload: null });
        // noinspection ES6MissingAwait
        context.resume();
        s.start();
      })
      break;
    case 'pause':
      // noinspection ES6MissingAwait
      context.suspend();
      break;
    case 'stop':
      // noinspection ES6MissingAwait
      context.suspend();
      // NOTE: Safari doesn't support importing/exporting top-level awaits
      (await port).postMessage({ action: 'close', payload: null });
      break;
  }
};

// import * as synth from '#userscript';
// import port from '#port';
//
// const urls = Object.fromEntries(Object.entries(synth.worklets ?? {}).map(([name, worklet]) => {
//   const blob = new Blob([`registerProcessor('${ name }', ${ worklet.toString() });`], { type: 'application/javascript' });
//   return [name, URL.createObjectURL(blob)];
// }));
//
// const addModule = AudioWorklet.prototype.addModule;
// AudioWorklet.prototype.addModule = async function () {
//   arguments[0] = urls[arguments[0]];
//   return await addModule.apply(this, arguments);
// };
//
// const graph = new Map();
//
// const connect = AudioNode.prototype.connect;
// const disconnect = AudioNode.prototype.disconnect;
//
// AudioNode.prototype.connect = function () {
//   if (!graph.has(this.context)) {
//     graph.set(this.context, new Set());
//   }
//   graph.get(this.context).add([this, arguments[0]]);
//   return connect.apply(this, arguments);
// };
// AudioNode.prototype.disconnect = function () {
//   graph.get(this.context).delete([this, arguments[0]]);
//   return disconnect.apply(this, arguments);
// };
//
// const playing = new Set();
//
// let gain;
// let context;
//
// // NOTE: Safari doesn't support importing/exporting top-level awaits
// (await port).onmessage = async e => {
//   switch (e.data.action) {
//     case 'play':
//       await (async () => {
//         const s = await synth.default();
//         context = s.context;
//         const master = new GainNode(s.context);
//         gain = new GainNode(s.context);
//         connect.call(master, gain);
//         connect.call(gain, s.context.destination);
//         graph.get(s.context)?.forEach(([from, to]) => {
//           if (to instanceof AudioDestinationNode) {
//             disconnect.call(from, to);
//             connect.call(from, master);
//           }
//         });
//         master.gain.value = e.data.gain;
//         graph.delete(s.context);
//
//         playing.add(s.context);
//
//         let current = {};
//         Object.keys(e.data.timeline)
//           .sort((a, b) => +a - +b)
//           .forEach(time => {
//             current = { ...current, ...e.data.timeline[time] };
//             const functions = new Map();
//             Object.keys(e.data.timeline[time]).forEach(parameter =>
//               Array.from(s.updates.keys())
//                 .filter(params => params.includes(parameter))
//                 .forEach(params => !functions.has(params) && functions.set(params, s.updates.get(params)))
//             );
//             // if (functions.size === 0) [...s.updates.values()].forEach(fun => functions.set([undefined, time], fun)); /* NOTE: Might be hacky */
//             Array.from(functions.entries()).forEach(([params, update]) => update(...params.filter(p => !synth.parameters.time.includes(p)).map(p => current[p]), time)); /* TODO: fix hack */
//           });
//
//         s.start();
//       })();
//       break;
//     case 'resume':
//       playing.forEach(p => p?.resume());
//       break;
//     case 'pause':
//       playing.forEach(p => p?.suspend());
//       break;
//     case 'stop':
//       playing.forEach(p => p?.suspend());
//       playing.clear();
//       // NOTE: Safari doesn't support importing/exporting top-level awaits
//       (await port).postMessage({ action: 'close', payload: null });
//       break;
//     case 'gain':
//       gain?.gain.linearRampToValueAtTime(e.data.gain, context.currentTime + 1); // NOTE: Temporary hacky solution
//       break;
//     default:
//   }
// };
