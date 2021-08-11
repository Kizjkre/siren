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
import BPMWindow from '../workstation/windows/BPMWindow';
import KeyWindow from '../workstation/windows/KeyWindow';
import TimesigWindow from '../workstation/windows/TimesigWindow';
import ChannelWindow from '../workstation/windows/ChannelWindow';
import ProfileWindow from '../workstation/windows/ProfileWindow';

const Workstation = ({ files, tracks, channels, fileBrowser }) => {
  useDemoData();

  return (
    <>
      { Object.keys(files).map(name => <CreateTrackWindow key={ name } track={ name } id={ `window-${ name }` } />) }
      { Object.keys(channels).map(name => <ChannelSettingsWindow key={ name } id={ `window-channel-settings-${ name }` } name={ name } />) }
      { Object.entries(tracks).map(([id, { name }]) => <TrackSettingsWindow key={ name } id={ `window-sonification-${ name }` } trackId={ id } />) }
      <ViewWindow />
      <BPMWindow />
      <KeyWindow />
      <TimesigWindow />
      <ChannelWindow />
      <ProfileWindow />

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
