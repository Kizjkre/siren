const processSynth = (name, synth, port) => {
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

  const s = synth();

  const parameters = new Set();

  s.update.forEach(([, p]) => p instanceof Array ? p.forEach(p2 => parameters.add(p2)) : parameters.add(p));

  port.postMessage({
    name,
    parameters
  });

  graph.delete(s.context);

  port.onmessage = e => {
    switch (e.data.action) {
      case 'demo':
        (() => {
          const s = synth();
          s.start();
          setTimeout(() => s.stop(), 2000);
        })();
        break;
      case 'play':
        (() => {
          const s = synth();
          const master = new GainNode(s.context);
          master._SIREN_connect(s.context.destination);
          console.log(graph);
          graph.get(s.context).forEach(([from, to]) => {
            if (to instanceof AudioDestinationNode) {
              from._SIREN_disconnect(to);
              from._SIREN_connect(master);
            }
          });
          master.gain.value = e.data.gain;
          s.start(e.data.timeline);
          graph.delete(s.context);
        })();
        break;
      default:
    }
  };
};

export default processSynth.toString();
