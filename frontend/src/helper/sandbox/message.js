const message = ({ synth, uuid, origin }) => {
  const channel = new MessageChannel();
  const port = channel.port1;

  window.top.postMessage({ synth, uuid }, origin, [channel.port2]);

  return port;
};


export default message;
