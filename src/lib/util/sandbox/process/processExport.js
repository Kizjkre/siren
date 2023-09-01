import synth, { parameters } from '<URL>';

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

port.onmessage = async e => {
  const s = await synth();
  const master = new GainNode(s.context);

  const destination = s.context.createMediaStreamDestination();

  const recorder = new MediaRecorder(destination.stream, {
    mimeType: [
      'audio/wav',
      'audio/mpeg',
      'audio/mp3',
      'audio/mp4',
      'audio/ogg',
      'audio/x-aiff',
      'audio/webm',
    ].find(type => MediaRecorder.isTypeSupported(type))
  });
  const data = [];

  recorder.ondataavailable = e => data.push(e.data);

  recorder.onstop = () => {
    const blob = new Blob(data, { type: recorder.mimeType });
    port.postMessage(blob);
  };

  master._SIREN_connect(destination);
  graph.get(s.context)?.forEach(([from, to]) => {
    if (to instanceof AudioDestinationNode) {
      from._SIREN_disconnect(to);
      from._SIREN_connect(master);
    }
  });
  master.gain.value = 1;
  graph.delete(s.context);

  playing.add(s.context);

  let current = {};

  const timeline = Object.fromEntries(
    Object.entries(e.data.timeline).map(([key, value]) => [+key /* * 0.5 ** 3 */, value])
  );
  const times = Object.keys(timeline).sort((a, b) => a - b);

  times.forEach(time => {
      current = { ...current, ...timeline[time] };
      const functions = new Map();
      Object.keys(timeline[time]).forEach(parameter =>
        Array.from(s.updates.keys())
          .filter(params => params.includes(parameter))
          .forEach(params => !functions.has(params) && functions.set(params, s.updates.get(params)))
      );
      Array.from(functions.entries()).forEach(([params, update]) => update(...params.filter(p => !parameters.time.includes(p)).map(p => current[p]), time)); /* TODO: fix hack */
    });

  s.start();
  recorder.start();
  setTimeout(() => recorder.stop(), times.at(-1) * 1000 + 1000);
};
