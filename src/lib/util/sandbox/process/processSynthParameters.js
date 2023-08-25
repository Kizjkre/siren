import { parameters } from '<URL>';

port.onmessage = () => port.postMessage(parameters);
