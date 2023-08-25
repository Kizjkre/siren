// REF: https://stackoverflow.com/a/47986946
const module = (toExport, toImport) => {
  const blob = new Blob([toExport], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  const script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.innerText = toImport(url);

  document.body.append(script);
};
