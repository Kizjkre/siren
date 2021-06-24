import Toolbar from '../workstation/Toolbar';
import FileBrowser from '../workstation/FileBrowser';
import Main from '../workstation/Main';
import CreateTrackWindow from '../workstation/windows/CreateTrackWindow';
import Controls from '../workstation/Controls';
import useDemoData from '../../hooks/useDemoData';
import ChannelSettingsWindow from '../workstation/windows/ChannelSettingsWindow';
import TrackSettingsWindow from '../workstation/windows/TrackSettingsWindow';
import { connect } from 'react-redux';

const Workstation = ({ files, tracks, channels, fileBrowser }) => {
  useDemoData();

  return (
    <>
      { Object.keys(files).map(name => <CreateTrackWindow key={ name } track={ name } id={ `window-${ name }` } />) }
      { Object.keys(channels).map(name => <ChannelSettingsWindow key={ name } id={ `window-channel-settings-${ name }` } name={ name } />) }
      { Object.entries(tracks).map(([id, { name }]) => <TrackSettingsWindow key={ name } id={ `window-sonification-${ name }` } trackId={ id } />) }
      <Toolbar />
      <div className="columns">
        <div className={ `column is-2 ${ fileBrowser ? '' : 'is-hidden' }` }>
          <section className="section">
            <FileBrowser />
          </section>
        </div>
        <div className="column is-10">
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
