import p5 from 'p5';
import Sketch from './editor/sketch';
import { connect } from 'react-redux'
import { createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gain, Oscillator, Panner } from './editor/node';
import Navbar from './Navbar';

const Editor = ({ synth, open }) => {
  const editor = createRef();
  const sketch = new Sketch();

  useEffect(() => {
    const bound = editor.current.getBoundingClientRect();
    new p5(sketch.draw(bound.height, bound.width), 'editor');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addOsc = () => {
    sketch.add(new Oscillator(100, 100));
  };

  const addPan = () => {
    sketch.add(new Panner(200, 200));
  };

  const addGain = () => {
    sketch.add(new Gain(200, 200));
  };

  return (
    <>
      <div className="page-wrapper with-navbar">
        <Navbar>
          <Link className="navbar-item" to="/workstation">
            Workstation
          </Link>
        </Navbar>
        <div className="content-wrapper">
          <button className="btn btn-primary" type="button" onClick={ () => addOsc() }>Add Oscillator</button>
          <button className="btn btn-primary" type="button" onClick={ () => addPan() }>Add Panner</button>
          <button className="btn btn-primary" type="button" onClick={ () => addGain() }>Add Gain</button>
          <div id="editor" ref={ editor } />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  synth: state.editor?.synth,
  open: state.editor?.open
});

export default connect(mapStateToProps)(Editor);
