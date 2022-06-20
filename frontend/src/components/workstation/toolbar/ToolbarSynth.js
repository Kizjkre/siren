import { useState } from 'react';
import SynthDock from '../SynthDock';

const ToolbarSynth = ({ selected, setSelected }) => {
  const [click, setClick] = useState(false);

  return (
    <>
      <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` }>
        <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>Synth</span>
        <div className="navbar-dropdown">
          <a className="navbar-item" onClick={ () => setClick(true) }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
            <div className="icon-text">
              <span className="icon">
                <i className="fa fa-plus" />
              </span>
              <span>Add Synth</span>
            </div>
          </a>
        </div>
      </div>
      <SynthDock
        click={ click }
        setClick={ setClick }
        onUpload={ () => setSelected(false) }
      />
    </>
  );
};

export default ToolbarSynth;
