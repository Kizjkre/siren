import JSZip from 'jszip';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { addSynth, focusWindow } from '../../actions';
import { validateSynth } from '../../helper/synth/validator';
import Window from '../Window';

const SynthDock = ({ click, setClick, onUpload, addSynth, focusWindow }) => {
  const [err, setErr] = useState('');
  const input = useRef();

  useEffect(() => {
    if (click) {
      input.current?.click();
      setClick(false);
    }
  }, [click]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImport = async e => {
    if (e.target.files.length) {
      let synth;
      let zip;
      const file = await fetch(URL.createObjectURL(e.target.files[0]));
      if (e.target.files[0].type === 'application/json') {
        synth = await file.json();
      } else {
        zip = await JSZip.loadAsync(await file.blob());
        synth = JSON.parse(await Object.values(zip.files).find(file => /^(?!__MACOSX\/)[^/]*\.json$/.test(file.name)).async('string'));
      }
      const valid = validateSynth(synth);
      if (valid[0]) {
        synth.nodes.filter(node => node.type === 'convolver').forEach(async node => synth.irs = { ...synth.irs, [node.impulseResponse]: await zip.files[node.impulseResponse].async('blob') });
        addSynth(synth);
      } else {
        setErr(`Malformed synth: ${ valid[1][0].message[0].toUpperCase() + valid[1][0].message.substr(1) }`);
        focusWindow('window-synth');
      }
      e.target.value = '';
      onUpload?.();
    }
  };

  return (
    <>
      <Window id="window-synth" title="Synth Upload Error">
        <div className="notification is-danger">
          { err }
        </div>
      </Window>
      <input type="file" id="synth-import" className="is-hidden" accept="application/json,application/zip" onChange={ handleImport } ref={ input } />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  addSynth: synth => dispatch(addSynth(synth)),
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(null, mapDispatchToProps)(SynthDock);
