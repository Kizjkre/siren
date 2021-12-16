import Window from '../../Window';
import { connect } from 'react-redux';
import { editChannelFeatures, editChannelSynth } from '../../../actions';

const ChannelSettingsWindow = ({ id, name, tracks, channels, synths, editChannelFeatures, editChannelSynth }) => {
  const handleSynth = e => editChannelSynth(name, e.target.value);
  const handleAssign = (feature, track) => () => editChannelFeatures(name, feature, track);

  return (
    <Window id={ id } title={ `Channel Settings: ${ name }` }>
      <div className="level">
        <div className="level-item">
          <div className="select">
            <select onChange={ handleSynth }>
              {
                Object.keys(synths).map(
                  (synth, i) => <option key={ i } value={ synth }>{ synth }</option>
                )
              }
            </select>
          </div>
        </div>
      </div>
      <hr/>
      <table className="table is-bordered">
        <thead>
          <tr>
            <td />
            {
              Object.keys(channels[name].features).map(
                (feature, i) => <td key={ i }>{ feature }</td>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            channels[name].tracks.map((track, i) => (
              <tr key={ i }>
                <td>{ tracks[track].name }</td>
                {
                  Object.keys(channels[name].features).map((feature, i) => {
                    let className = 'channel-feature-disabled';
                    let icon = (
                      <span className="icon">
                        <i className="fa fa-times" />
                      </span>
                    );
                    switch (channels[name].features[feature]) {
                      case tracks[track].name:
                        className = 'channel-feature-checked';
                        icon = (
                          <span className="icon">
                            <i className="fa fa-check" />
                          </span>
                        );
                        break;
                      case '':
                        className = '';
                        icon = null;
                        break;
                      default:
                    }
                    return <td className={ className } onClick={ handleAssign(feature, tracks[track].name) } key={ i }>{ icon }</td>
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </Window>
  );
};

const mapStateToProps = state => ({
  tracks: state.workstation.tracks,
  channels: state.workstation.channels,
  synths: state.workstation.synths
});

const mapDispatchToProps = dispatch => ({
  editChannelFeatures: (channel, feature, track) => dispatch(editChannelFeatures(channel, feature, track)),
  editChannelSynth: (channel, synth) => dispatch(editChannelSynth(channel, synth))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettingsWindow);
