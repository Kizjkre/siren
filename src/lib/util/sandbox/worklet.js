class AudioWorkletProcessor {
  // noinspection JSUnusedGlobalSymbols
  port = new MessagePort();

  // noinspection JSUnusedGlobalSymbols
  static get parameterDescriptors() {
    return [];
  }

  // noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
  process(inputs, outputs, parameters) {
    return true;
  }
}

window.AudioWorkletProcessor = AudioWorkletProcessor;
