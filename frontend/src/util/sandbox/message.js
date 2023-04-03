export default ({ name, uuid, origin }) => {
  const channel = new MessageChannel();
  const port = channel.port1;

  window.top.postMessage({ name, uuid }, origin, [channel.port2]);

  return port;
};
