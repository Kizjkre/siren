import { addSynth, focusWindow } from '../../actions';
import Window from '../Window';
import { validateSynth } from '../../helper/synth/validator';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

const SynthDock = ({ click, setClick, onUpload, addSynth, focusWindow }) => {
  const [err, setErr] = useState(<></>);
  const input = useRef();

  useEffect(() => {
    if (click) {
      input.current?.click();
      setClick(false);
    }
  }, [click]);

  const handleImport = async e => {
    setErr(<></>);
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      const synth = await (await fetch(url)).json();
      const valid = validateSynth(synth);
      if (valid[0]) {
        addSynth(synth);
      } else {
        setErr((
          <Window id="window-synth" title="Synth Upload Error">
            <div className="notification is-danger">
              <button className="delete" onClick={ () => setErr(<></>) }/>
              Malformed synth: { valid[1][0].message[0].toUpperCase() + valid[1][0].message.substr(1) }
            </div>
          </Window>
        ));
        focusWindow('window-synth');
      }
      e.target.value = '';
      onUpload?.();
    }
  };

  return (
    <>
      { err }
      <input type="file" id="synth-import" className="is-hidden" accept="application/json" onChange={ handleImport } ref={ input } />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  addSynth: synth => dispatch(addSynth(synth)),
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(null, mapDispatchToProps)(SynthDock);
