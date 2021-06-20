import Toolbar from '../workstation/Toolbar';
import FileBrowser from '../workstation/FileBrowser';
import Main from '../workstation/Main';
import CreateTrackWindow from '../workstation/windows/CreateTrackWindow';
import Controls from '../workstation/Controls';
import { connect } from 'react-redux';
import useDemoData from '../../hooks/useDemoData';

const Workstation = ({ files, fileBrowser }) => {
  useDemoData();

  return (
    <>
      { files.map(({ name }) => <CreateTrackWindow key={ name } track={ name } id={ `window-${ name }` } />) }
      {/*{ tracks.map(({ file, name }, i) => <Sonification key={ `sonification-${ name }-${ i }` } anchor={ `sonification-${ name.replace(/\s/g, '-') }-${ i }` } trackno={ i } />) }*/}
      <Toolbar />
      <div className="columns">
        <div className={ `column is-2 ${ fileBrowser ? '' : 'is-hidden' }` }>
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

const mapStateToProps = state => ({
  files: state.workstation.files,
  fileBrowser: state.workstation.settings.fileBrowser
});

export default connect(mapStateToProps)(Workstation);
