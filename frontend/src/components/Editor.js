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
      <Navbar>
        <Link className="navbar-item" to="/workstation">
          Workstation
        </Link>
      </Navbar>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <button className="button is-primary" type="button" onClick={ () => addOsc() }>Add Oscillator</button>
            </div>
            <div className="column">
              <button className="button is-primary" type="button" onClick={ () => addPan() }>Add Panner</button>
            </div>
            <div className="column">
              <button className="button is-primary" type="button" onClick={ () => addGain() }>Add Gain</button>
            </div>
          </div>
          <div id="editor" ref={ editor } />
        </div>
      </section>
    </>
  );
};

const mapStateToProps = state => ({
  synth: state.editor?.synth,
  open: state.editor?.open
});

export default connect(mapStateToProps)(Editor);
