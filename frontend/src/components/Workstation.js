import Toolbar from './workstation/Toolbar';
import FileBrowser from './workstation/FileBrowser';
import Main from './workstation/Main';
import AddTrack from './workstation/windows/AddTrack';
import Sonification from './workstation/windows/Sonification';
import Controls from './workstation/Controls';
import { connect } from 'react-redux';

const Workstation = ({ files, tracks }) => {
  return (
    <div className="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom">
      <div className="sticky-alerts" />
      { files.map(({ name }) => <AddTrack key={ `modal-${ name }` } anchor={ `modal-${ name }` } track={ name } />) }
      { tracks.map(({ file, name }, i) => <Sonification key={ `sonification-${ name }-${ i }` } anchor={ `sonification-${ name }-${ i }` } trackno={ i } />) }
      <Toolbar />
      <FileBrowser />
      <Main />
      <Controls />
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.files,
  tracks: state.tracks
});

export default connect(mapStateToProps)(Workstation);
