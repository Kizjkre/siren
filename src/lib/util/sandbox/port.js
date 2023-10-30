// NOTE: Safari doesn't support importing/exporting top-level awaits
const port = new Promise(resolve => {
  const listener = e => {
    window.removeEventListener('message', listener);
    const [p] = e.ports;

    resolve(p);
  }

  window.addEventListener('message', listener);
});

export default port;
