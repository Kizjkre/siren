import Toolbar from '../workstation/Toolbar';
import FileBrowser from '../workstation/Sidebar';
import Main from '../workstation/Main';
import CreateTrackWindow from '../workstation/windows/CreateTrackWindow';
import Controls from '../workstation/Controls';
import useDemoData from '../../hooks/useDemoData';
import ChannelSettingsWindow from '../workstation/windows/ChannelSettingsWindow';
import TrackSettingsWindow from '../workstation/windows/TrackSettingsWindow';
import { connect } from 'react-redux';
import ViewWindow from '../workstation/windows/ViewWindow';

const Workstation = ({ files, tracks, channels, fileBrowser }) => {
  useDemoData();

  return (
    <>
      { Object.keys(files).map(name => <CreateTrackWindow key={ name } track={ name } id={ `window-${ name }` } />) }
      { Object.keys(channels).map(name => <ChannelSettingsWindow key={ name } id={ `window-channel-settings-${ name }` } name={ name } />) }
      { Object.entries(tracks).map(([id, { name }]) => <TrackSettingsWindow key={ name } id={ `window-sonification-${ name }` } trackId={ id } />) }
      <ViewWindow />
      <Toolbar />
      <div className="columns">
        <div className={ `column is-2 ${ fileBrowser ? '' : 'is-hidden' } workstation-body` }>
          <section className="section">
            <FileBrowser />
          </section>
        </div>
        <div className="column is-10 workstation-body">
          <Main />
        </div>
      </div>
      <Controls />
    </>
  );
};

const mapStateToProps = state => ({
  files: state.workstation.files,
  tracks: state.workstation.tracks,
  channels: state.workstation.channels,
  fileBrowser: state.workstation.settings.fileBrowser
});

export default connect(mapStateToProps)(Workstation);
