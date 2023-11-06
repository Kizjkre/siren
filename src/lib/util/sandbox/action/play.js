import synth, { parameters } from '#userscript';
import port from '#port';

const graph = new Map();

AudioNode.prototype._SIREN_connect = AudioNode.prototype.connect;
AudioNode.prototype._SIREN_disconnect = AudioNode.prototype.disconnect;

AudioNode.prototype.connect = function () {
  if (!graph.has(this.context)) {
    graph.set(this.context, new Set());
  }
  graph.get(this.context).add([this, arguments[0]]);
  return this._SIREN_connect(...arguments);
};
AudioNode.prototype.disconnect = function () {
  graph.get(this.context).delete([this, arguments[0]]);
  return this._SIREN_disconnect(...arguments);
};

const playing = new Set();

let gain;

// NOTE: Safari doesn't support importing/exporting top-level awaits
(await port).onmessage = async e => {
  // console.log(e.data);
  switch (e.data.action) {
    case 'play':
      await (async () => {
        const s = await synth();
        const master = new GainNode(s.context);
        gain = new GainNode(s.context);
        master._SIREN_connect(gain)._SIREN_connect(s.context.destination);
        graph.get(s.context)?.forEach(([from, to]) => {
          if (to instanceof AudioDestinationNode) {
            from._SIREN_disconnect(to);
            from._SIREN_connect(master);
          }
        });
        master.gain.value = e.data.gain;
        graph.delete(s.context);

        playing.add(s.context);

        let current = {};
        Object.keys(e.data.timeline)
          .sort((a, b) => +a - +b)
          .forEach(time => {
            current = { ...current, ...e.data.timeline[time] };
            const functions = new Map();
            Object.keys(e.data.timeline[time]).forEach(parameter =>
              Array.from(s.updates.keys())
                .filter(params => params.includes(parameter))
                .forEach(params => !functions.has(params) && functions.set(params, s.updates.get(params)))
            );
            Array.from(functions.entries()).forEach(([params, update]) => update(...params.filter(p => !parameters.time.includes(p)).map(p => current[p]), time)); /* TODO: fix hack */
          });

        s.start();
      })();
      break;
    case 'resume':
      playing.forEach(p => p?.resume());
      break;
    case 'pause':
      playing.forEach(p => p?.suspend());
      break;
    case 'stop':
      playing.forEach(p => p?.suspend());
      playing.clear();
      // NOTE: Safari doesn't support importing/exporting top-level awaits
      (await port).postMessage(true);
      break;
    case 'gain':
      // console.log(e.data.gain);
      gain.gain.value = e.data.gain;
      break;
    default:
  }
};
