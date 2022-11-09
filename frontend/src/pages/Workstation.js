import { connect } from 'react-redux';
import Sandbox from '../components/Sandbox';
import Controls from '../components/workstation/Controls';
import Main from '../components/workstation/Main';
import FileBrowser from '../components/workstation/sidebar/Sidebar';
import Toolbar from '../components/workstation/toolbar/Toolbar';
import ChannelWindow from '../components/workstation/windows/ChannelWindow';
import CreateTrackWindow from '../components/workstation/windows/CreateTrackWindow';
import ProfileViewWindow from '../components/workstation/windows/ProfileViewWindow';
import ProfileWindow from '../components/workstation/windows/ProfileWindow';
import ViewWindow from '../components/workstation/windows/ViewWindow';
import useDemoData from '../hooks/useDemoData';
import useFrameMessage from '../hooks/useFrameMessage';

const Workstation = ({ files, channels, profiles, fileBrowser, synths }) => {
  useDemoData();
  useFrameMessage();

  return (
    <>
      { Object.keys(files).map(name => <CreateTrackWindow key={ name } track={ name } id={ `window-${ name }` } />) }
      { Object.keys(profiles).map(name => <ProfileViewWindow key={ name } id={ `window-profile-view-${ name }` } name={ name } />) }
      { Object.keys(synths).map((synth, i) => <Sandbox key={ i } name={ synth } { ...synths[synth] } />) }
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
  fileBrowser: state.workstation.settings.fileBrowser,
  synths: state.workstation.synths
});

export default connect(mapStateToProps)(Workstation);
