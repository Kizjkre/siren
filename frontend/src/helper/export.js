import JSZip from 'jszip';
import cloneDeep from 'lodash.clonedeep';
import store from '../store';

const createZip = async () => {
  const zip = new JSZip().folder('siren-session');

  zip.folder('siren-session/impulse-responses');

  const state = cloneDeep(store.getState());
  Object.entries({ ...state.workstation.synths }).forEach(([name, synth], i) =>
    Object.entries(synth.irs).forEach(async ([path, ir], j) => {
      state.workstation.synths[name].irs[path] = `siren-session/impulse-responses/${ i }-${ j }.wav`;
      zip.file(`siren-session/impulse-responses/${ i }-${ j }.wav`, ir);
    })
  );

  zip.file('siren-session/state.json', JSON.stringify(state));

  return await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
};

export default createZip;
