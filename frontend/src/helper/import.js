import JSZip from 'jszip';

const unzip = async file => {
  const zip = await JSZip.loadAsync(await (await fetch(URL.createObjectURL(file))).blob()); // TODO: Error handling
  const state = JSON.parse(await zip.files['siren-session/state.json'].async('string'));
  Object.entries({ ...state.workstation.synths }).forEach(([name, synth]) =>
    Object.entries(synth.irs).forEach(async ([path, ir]) =>
      state.workstation.synths[name].irs[path] = await zip.files[ir].async('blob')
    )
  );
  return state;
};

export default unzip;
