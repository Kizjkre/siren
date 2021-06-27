const chunkify = (data, size) => {
  if (size < 1) {
    return data;
  }

  const temp = [];
  data.forEach(d => {
    for (let i = 0; i < d.length - size; i += size) {
      temp.push(d.substr(i, size));
    }
  });
  return temp;
};

addEventListener('message', e => {
  const { type, params } = e.data;

  switch (type) {
    case 'chunkify':
      postMessage(chunkify(...params));
      break;
  }
});
