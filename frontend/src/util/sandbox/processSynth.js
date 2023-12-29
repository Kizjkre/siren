const processSynth = (name, synth, parameters, port) => {
  const instances = [];
  const graph = new Map();

  AudioNode.prototype._SIREN_connect = AudioNode.prototype.connect;
  AudioNode.prototype._SIREN_disconnect = AudioNode.prototype.disconnect;

  AudioNode.prototype.connect = function () {
    if (!graph.has(this.context)) {
      graph.set(this.context, new Set());
    }
    graph.get(this.context).add([this, arguments[0]]);
    this._SIREN_connect(...arguments);
  };
  AudioNode.prototype.disconnect = function () {
    graph.get(this.context).delete([this, arguments[0]]);
    this._SIREN_disconnect(...arguments);
  };

  port.postMessage({ name, parameters });

  port.onmessage = e => {
    switch (e.data.action) {
      case 'demo':
        (async () => {
          const s = await synth();
          graph.delete(s.context);

          Array.from(s.updates.values()).forEach(update => update());
          s.start();

          setTimeout(() => s.stop(), 1000);
        })();
        break;
      case 'play':
        (async () => {
          const s = await synth();
          const master = new GainNode(s.context);
          master._SIREN_connect(s.context.destination);
          graph.get(s.context)?.forEach(([from, to]) => {
            if (to instanceof AudioDestinationNode) {
              from._SIREN_disconnect(to);
              from._SIREN_connect(master);
            }
          });
          master.gain.value = e.data.gain;
          graph.delete(s.context);

          let current = {};
          Object.keys(e.data.timeline)
            .sort((a, b) => a - b)
            .forEach(percent => {
              current = { ...current, ...e.data.timeline[percent], Time: +percent / 4 };
              const functions = new Map();
              Object.keys(e.data.timeline[percent]).forEach(parameter =>
                Array.from(s.updates.keys())
                  .filter(params => params.includes(parameter))
                  .forEach(params => !functions.has(params) && functions.set(params, s.updates.get(params)))
              );
              Array.from(functions.entries()).forEach(([params, update]) => update(...params.map(p => current[p])));
            });

          s.start();
        })();
        break;
      case 'pause':

        break;
      default:
    }
  };
};

export default processSynth.toString();
