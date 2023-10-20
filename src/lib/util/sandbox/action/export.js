import synth, { parameters } from '#userscript';
import port from '#port';

/**
 * Converts an AudioBuffer to a WAV file.
 *
 * @param {AudioBuffer} buffer - The AudioBuffer to convert.
 * @return {Blob} The converted audio data as a Blob.
 */
const audioBufferToWav = buffer => {
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;
  const audioData = [];

  for (let channel = 0; channel < numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);

    for (let i = 0; i < length; i++) {
      audioData.push(Math.max(-1, Math.min(1, channelData[i])));
    }
  }

  const wavBuffer = new ArrayBuffer(44 + audioData.length * 2);
  const view = new DataView(wavBuffer);

  let viewOffset= 0;

  const setUint16 = value => {
    view.setUint16(viewOffset, value, true);
    viewOffset += 2;
  };

  const setUint32 = value => {
    view.setUint32(viewOffset, value, true);
    viewOffset += 4;
  };

  const setInt16 = value => {
    view.setInt16(viewOffset, value, true);
    viewOffset += 2;
  };

  /* Set WAV header */
  setUint32(0x46464952); /* "RIFF" */
  setUint32(36 + audioData.length * 2); /* Chunk size */
  setUint32(0x45564157); /* "WAVE" */

  setUint32(0x20746d66); /* "fmt" chunk */
  setUint32(16); /* Sub-chunk size */
  setUint16(1); /* Audio format (1 for PCM) */
  setUint16(numberOfChannels); /* Number of channels */
  setUint32(sampleRate); /* Sample rate */
  setUint32(sampleRate * numberOfChannels * 2); /* Byte rate */
  setUint16(numberOfChannels * 2); /* Block align */
  setUint16(16); /* Bits per sample */

  setUint32(0x61746164); /* "data" chunk */
  setUint32(audioData.length * 2); /* Sub-chunk size */

  /* Write audio data */
  for (let i = 0; i < audioData.length; i++) {
    setInt16(audioData[i] * 0x7fff);
  }

  return new Blob([view], { type: 'audio/wav' });
};

const graph = new Map();

let length = 0;
window.AudioContext = function () {
  const sampleRate = arguments[0]?.sampleRate || 44100;
  return new OfflineAudioContext({ numberOfChannels: 2, length: length * sampleRate, sampleRate });
};

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
  let current = {};
  const timeline = Object.fromEntries(
    Object.entries(e.data.timeline).map(([key, value]) => [+key, value])
  );
  const times = Object.keys(timeline).sort((a, b) => a - b);

  length = times.at(-1) + 1;

  const s = await synth();

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

  const master = new GainNode(s.context);
  master._SIREN_connect(s.context.destination);
  graph.get(s.context)?.forEach(([from, to]) => {
    if (to instanceof AudioDestinationNode) {
      from._SIREN_disconnect(to);
      from._SIREN_connect(master);
    }
  });
  master.gain.value = 1;
  graph.delete(s.context);

  playing.add(s.context);

  s.start();
  const buf = await s.context.startRendering();
  port.postMessage(audioBufferToWav(buf));
};
