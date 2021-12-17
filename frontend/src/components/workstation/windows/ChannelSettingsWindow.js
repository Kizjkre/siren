import Window from '../../Window';
import { connect } from 'react-redux';
import { editChannelFeatures, editChannelFill, editChannelSynth } from '../../../actions';
import { FillType } from '../../../constants/state';

const ChannelSettingsWindow = ({ id, name, tracks, channels, synths, editChannelFeatures, editChannelSynth, editChannelFill }) => {
  const handleSynth = e => editChannelSynth(name, e.target.value);
  const handleAssign = (feature, track) => () => editChannelFeatures(name, feature, track);
  const handleFill = feature => e => editChannelFill(name, feature, e.target.value);

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
                    switch (channels[name].features[feature].track) {
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
          <tr>
            <td>Fill</td>
            {
              Object.keys(channels[name].features).map((feature, i) => (
                <td key={ i }>
                  <div className="select is-small">
                    <select defaultValue={ channels[name].features[feature].fill } onChange={ handleFill(feature) }>
                      {
                        Object.keys(FillType).map((key, i) => <option key={ i } value={ key }>{ FillType[key] }</option>)
                      }
                    </select>
                  </div>
                </td>
              ))
            }
          </tr>
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
  editChannelSynth: (channel, synth) => dispatch(editChannelSynth(channel, synth)),
  editChannelFill: (channel, feature, fill) => dispatch(editChannelFill(channel, feature, fill))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettingsWindow);
