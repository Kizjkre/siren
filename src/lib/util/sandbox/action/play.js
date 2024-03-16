import port from '#port';

const context = new AudioContext();

const synths = await Promise.all(
  [...document.getElementsByTagName('script')]
    .filter(e => e.id.includes('userscript-'))
    .map(async e => await import(e.src))
);

const addModule = AudioWorklet.prototype.addModule;

const res = synths.map(async synth => {
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
  gain.connect(control).connect(context.destination);
  control.gain.value = 1 / synths.length;

  const s = await synth.default(context, gain);

  return [synth, await s, gain];
});

const ids = {};

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).onmessage = async e => {
  switch (e.data.action) {
    case 'play':
      // noinspection ES6MissingAwait
      (async () => {
        const task = res.map(async (promise, i) => {
          const [synth, s] = await promise;

          let current = {};
          Object.keys(e.data.payload.timeline[i])
            .forEach(time => {
              current = { ...current, ...e.data.payload.timeline[i][time] };
              const functions = new Map();
              Object.keys(e.data.payload.timeline[i][time]).forEach(parameter =>
                Array.from(s.updates.keys())
                  .filter(params => params.includes(parameter))
                  .forEach(params => !functions.has(params) && functions.set(params, s.updates.get(params)))
              );

              const now = context.currentTime;

              // if (functions.size === 0) [...s.updates.values()].forEach(fun => functions.set([undefined, time], fun)); /* NOTE: Might be hacky */
              Array.from(functions.entries()).forEach(([params, update]) => update(...params.filter(p => !synth.parameters.time.includes(p)).map(p => current[p]), now + +time)); /* TODO: fix hack */
            });

          (await port).postMessage({ action: 'start', payload: null });
          // noinspection ES6MissingAwait
          context.resume();
          s.start();

          ids[e.data.payload.timeline[i].id] = i;
        });

        await Promise.all(task);

        Object.keys(ids).forEach(async () => (await port).postMessage({ action: 'gain', payload: null }));
      })();
      break;
    case 'pause':
      // noinspection ES6MissingAwait
      context.suspend();
      break;
    case 'stop':
      // noinspection ES6MissingAwait
      context.suspend();

      Object.keys(ids).forEach(key => delete ids[key]);

      // NOTE: Safari doesn't support importing/exporting top-level awaits
      (await port).postMessage({ action: 'close', payload: null });
      break;
    case 'resume':
      // noinspection ES6MissingAwait
      context.resume();
      (await port).postMessage({ action: 'start', payload: null });
      break;
    case 'gain':
      (await res[ids[e.data.payload.id]])[2].gain.setValueAtTime(e.data.payload.gain, context.currentTime);
      break;
  }
};
