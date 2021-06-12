import { useEffect } from 'react';
import Toolbar from './workstation/Toolbar';
import FileBrowser from './workstation/FileBrowser';
import Main from './workstation/Main';
import AddTrack from './workstation/windows/AddTrack';
import Sonification from './workstation/windows/Sonification';
import Controls from './workstation/Controls';
import { connect } from 'react-redux';
import { setGlobalDark, setState } from '../actions';
import demoData from '../helper/demo';

let dark;

const Workstation = ({ files, tracks, setGlobalDark, setGlobalState }) => {
  const keyPress = keys => {
    if (keys.length === 2 && keys[0] === 'shift' && keys[1] === 'd') {
      dark = !dark;
      setGlobalDark(dark);
    }
  };

  useEffect(() => {
    let keys = [];

    document.addEventListener('keydown', e => {
      if (!(document.querySelector('input:focus') || document.querySelector('textarea:focus') || document.querySelector('select:focus'))) {
        keys.push(e.key.toLowerCase());
        keyPress(keys);
      }
    });
    document.addEventListener('keyup', e => {
      if (!(document.querySelector('input:focus') || document.querySelector('textarea:focus') || document.querySelector('select:focus'))) {
        keys.splice(keys.indexOf(e.key.toLowerCase()), 1);
        keyPress(keys);
      }
    });

    setGlobalState(demoData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      { files.map(({ name }) => <AddTrack key={ `modal-${ name }` } anchor={ `modal-${ name }` } track={ name } />) }
      { tracks.map(({ file, name }, i) => <Sonification key={ `sonification-${ name }-${ i }` } anchor={ `sonification-${ name.replace(/\s/g, '-') }-${ i }` } trackno={ i } />) }
      <Toolbar />
      <div className="columns">
        <div className="column is-2">
          <section className="section">
            <FileBrowser />
          </section>
        </div>
        <div className="column">
          <Main />
        </div>
      </div>
      <Controls />
    </>
  );
};

const mapStateToProps = state => {
  dark = state.globalSettings.dark;
  return ({
    files: state.files,
    tracks: state.tracks
  })
};

const mapDispatchToProps = dispatch => ({
  setGlobalDark: dark => dispatch(setGlobalDark(dark)),
  setGlobalState: state => dispatch(setState(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Workstation);
