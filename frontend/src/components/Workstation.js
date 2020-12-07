import Toolbar from './workstation/Toolbar';
import FileBrowser from './workstation/FileBrowser';
import Main from './workstation/Main';
import AddTrack from './workstation/AddTrack';
import Controls from './workstation/Controls';
import { connect } from 'react-redux';

const Workstation = ({ files }) => {
  return (
    <div className="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom">
      <div className="sticky-alerts" />
      { files.map(({ name }) => <AddTrack key={ `modal-${ name }` } anchor={ `modal-${ name }` } track={ name } />) }
      <Toolbar />
      <FileBrowser />
      <Main />
      <Controls />
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.files
});

export default connect(mapStateToProps)(Workstation);