import { connect } from 'react-redux';
import useDemoData from '../../hooks/useDemoData';
import Controls from '../workstation/Controls';
import Main from '../workstation/Main';
import FileBrowser from '../workstation/sidebar/Sidebar';
import Toolbar from '../workstation/toolbar/Toolbar';
import ChannelSettingsWindow from '../workstation/windows/ChannelSettingsWindow';
import ChannelWindow from '../workstation/windows/ChannelWindow';
import CreateTrackWindow from '../workstation/windows/CreateTrackWindow';
import ProfileViewWindow from '../workstation/windows/ProfileViewWindow';
import ProfileWindow from '../workstation/windows/ProfileWindow';
import ViewWindow from '../workstation/windows/ViewWindow';

const Workstation = ({ files, channels, profiles, fileBrowser }) => {
  useDemoData();

  return (
    <>
      { Object.keys(files).map(name => <CreateTrackWindow key={ name } track={ name } id={ `window-${ name }` } />) }
      { Object.keys(channels).map(name => <ChannelSettingsWindow key={ name } id={ `window-channel-settings-${ name }` } name={ name } />) }
      { Object.keys(profiles).map(name => <ProfileViewWindow key={ name } id={ `window-profile-view-${ name }` } name={ name } />) }
      <ViewWindow />
      <ChannelWindow />
      <ProfileWindow />

      <Toolbar />
      <div className="columns">
        <div className={ `column is-2 ${ fileBrowser ? '' : 'is-hidden' } workstation-body` }>
          <section className="section">
            <FileBrowser />
          </section>
        </div>
        <div className={ `column ${ fileBrowser ? 'is-10' : '' } workstation-body` }>
          <Main />
        </div>
      </div>
      <Controls />
    </>
  );
};

const mapStateToProps = state => ({
  files: state.workstation.files,
  channels: state.workstation.channels,
  profiles: state.workstation.profiles,
  fileBrowser: state.workstation.settings.fileBrowser
});

export default connect(mapStateToProps)(Workstation);
