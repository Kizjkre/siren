export default ({ name, uuid, type, origin }) => {
  const channel = new MessageChannel();
  const port = channel.port1;

  window.top.postMessage({ name, uuid, type }, origin, [channel.port2]);

  return port;
};
