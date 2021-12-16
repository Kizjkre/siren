import Window from '../../Window';
import { validateSynth } from '../../../helper/synth/validator';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addSynth } from '../../../actions';

const SynthDockWindow = ({ addSynth }) => {
  const [err, setErr] = useState(<></>);

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
          <div className="notification is-danger">
            <button className="delete" onClick={ () => setErr(<></>) }/>
            Malformed synth: { valid[1][0].message[0].toUpperCase() + valid[1][0].message.substr(1) }
          </div>
        ));
      }
      e.target.value = '';
    }
  };

  return (
    <Window id="window-synth" title='Synth Dock'>
      { err }
      <input type="file" id="synth-import" className="is-hidden" accept="application/json" onChange={ handleImport } />
      <label htmlFor="synth-import" className="button is-primary">
        <span className="icon">
          <i className="fa fa-wave-square" />
        </span>
        <span>Import Synth</span>
      </label>
    </Window>
  );
};

const mapDispatchToProps = dispatch => ({
  addSynth: synth => dispatch(addSynth(synth))
});

export default connect(null, mapDispatchToProps)(SynthDockWindow);
