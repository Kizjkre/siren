import Toolbar from './workstation/Toolbar';
import FileBrowser from './workstation/FileBrowser';
import Main from './workstation/Main';
import AddTrack from './workstation/AddTrack';
import { connect } from 'react-redux';

const Workstation = ({ tracks }) => {
  return (
    <div className="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom">
      <div className="sticky-alerts" />
      { tracks.map(track => <AddTrack key={ `modal-${ track }` } anchor={ `modal-${ track }` } track={ track } />) }
      <Toolbar />
      <FileBrowser />
      <Main />
      <nav className="navbar navbar-fixed-bottom">
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks
});

export default connect(mapStateToProps)(Workstation);