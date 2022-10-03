import { connect } from 'react-redux';
import { addSynth } from '../../../actions';
import synthDemo from '../../../helper/sandbox/demo';

const ToolbarSynth = ({ selected, setSelected, synths, addSynth }) => {
  const handleSynth = async e => {
    if (e.target.files.length) {
      const code = await (await fetch(URL.createObjectURL(e.target.files[0]))).text();
      addSynth({ name: e.target.files[0].name, code });
      e.target.value = '';
      setSelected(false);
    }
  };

  return (
    <>
      <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` }>
        <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>Synth</span>
        <div className="navbar-dropdown">
          <label htmlFor="add-synth" className="navbar-item">
            <input type="file" id="add-synth" className="is-hidden" accept="text/javascript" onChange={ handleSynth } />
            <div className="icon-text">
              <span className="icon">
                <i className="fa fa-plus" />
              </span>
              <span>Add Synth</span>
            </div>
          </label>
          <hr className="dropdown-divider" />
          {
            Object.keys(synths).map((synth, i) => (
              <a key={ i } className="navbar-item" onClick={ () => synthDemo(synth) }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                <div className="icon-text">
                  <span className="icon">
                    <i className="fa fa-wave-square" />
                  </span>
                  <span>{ synth }</span>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  synths: state.workstation.synths
});

const mapDispatchToProps = dispatch => ({
  addSynth: synth => dispatch(addSynth(synth))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarSynth);
