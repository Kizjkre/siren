import Window from '../../Window';
import { connect } from 'react-redux';
import { INITIAL_CHANNEL_SETTINGS } from '../../../constants/state';
import { editChannelFeatures } from '../../../actions';

const ChannelSettingsWindow = ({ id, name, tracks, channels, editChannelFeatures }) => (
  <Window id={ id } title={ `Channel Settings: ${ name }` }>
    hi
  </Window>
);

const mapStateToProps = state => ({
  tracks: state.workstation.tracks,
  channels: state.workstation.channels
});

const mapDispatchToProps = dispatch => ({
  editChannelFeatures: (channel, feature, track) => dispatch(editChannelFeatures(channel, feature, track))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettingsWindow);
