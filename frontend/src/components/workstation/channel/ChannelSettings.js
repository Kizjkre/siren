import { useState } from 'react';
import { connect } from 'react-redux';
import { editChannel, editChannelFeatures, editChannelFill, editChannelSynth } from '../../../actions';
import { FillType, PARAMETER_TYPE } from '../../../constants/state';

const ChannelSettings = ({ name, tracks, channels, synths, editChannel, editChannelFeatures, editChannelSynth, editChannelFill }) => {
  const [track, setTrack] = useState('');

  const handleSynth = e => editChannelSynth(name, e.target.value);
  const handleAssign = (feature, track) => () => editChannelFeatures(name, feature, track);
  const handleFill = feature => e => editChannelFill(name, feature, e.target.value);

  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <td>
            <div className="field has-addons">
              <div className="control">
                <a className="button is-static is-small"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                  Synth:
                </a>
              </div>
              <div className="control">
                <div className="select is-small">
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
          </td>
          {
            Object.keys(channels[name].features).map(
              (feature, i) => (
                <td key={ i }>
                  <div className="level">
                    <div className="level-item">
                      { feature }
                    </div>
                  </div>
                </td>
              )
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          channels[name].tracks.map((track, i) => (
            <tr key={ i }>
              <td>
                <div className="level">
                  <div className="level-item">
                    { tracks[track].name }&emsp;
                  </div>
                  <div className="level-item">
                    <button className="button is-danger is-small" onClick={ () => editChannel(name, track) }>
                      <span className="icon is-small">
                        <i className="fas fa-trash" />
                      </span>
                    </button>
                  </div>
                </div>
              </td>
              {
                Object.keys(channels[name].features).map((feature, i) => {
                  let className = 'channel-feature-disabled';
                  let icon = (
                    <span className="icon">
                      <i className="fa fa-times" />
                    </span>
                  );
                  switch (channels[name].features[feature].track) {
                    case track:
                      className = 'channel-feature-checked';
                      icon = (
                        <span className="icon">
                          <i className="fa fa-check" />
                        </span>
                      );
                      break;
                    case -1:
                      className = '';
                      icon = null;
                      break;
                    default:
                  }
                  return <td className={ `channel-feature ${ className }` } onClick={ handleAssign(feature, track) }
                             key={ i }>{ icon }</td>;
                })
              }
            </tr>
          ))
        }
        <tr>
          <td>
            <div className="level">
              <div className="level-item">
                Fill
              </div>
            </div>
          </td>
          {
            Object.keys(channels[name].features).map((feature, i) => channels[name].features[feature].type === PARAMETER_TYPE.TIME ? (
              <td key={ i }>
                <div className="select is-small">
                  <select defaultValue="Fit" onChange={ handleFill(feature) }>
                    {
                      Object.keys(FillType)
                        .filter(fill => !['STRETCH'].includes(fill))
                        .map((key, i) =>
                          <option key={ i } value={ FillType[key] }>{ FillType[key] }</option>
                        )
                    }
                  </select>
                </div>
              </td>
            ) : (
              <td key={ i }>
                <div className="select is-small">
                  <select defaultValue={ channels[name].features[feature].fill } onChange={ handleFill(feature) }>
                    {
                      Object.keys(FillType)
                        .map((key, i) =>
                          <option key={ i } value={ FillType[key] }>{ FillType[key] }</option>
                        )
                    }
                  </select>
                </div>
              </td>
            ))
          }
        </tr>
        <tr>
          <td colSpan={ Object.keys(channels[name].features).length + 1 }>
            <div className="field has-addons">
              <div className="control is-expanded">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={ track } onChange={ e => setTrack(e.target.value) }>
                      <option value="" disabled>Select a track</option>
                      {
                        Object.entries(tracks)
                          .filter(track => !channels[name].tracks.includes(parseInt(track[0])))
                          .map(track =>
                            <option key={ track[0] } value={ track[0] }>
                              { track[1].name }
                            </option>
                          )
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="control">
                <button
                  className="button is-success is-fullwidth"
                  onClick={ () => {
                    editChannel(name, parseInt(track));
                    setTrack('');
                  } }
                  disabled={ track === '' || channels[name].tracks.includes(track) }
                >
                  <span className="icon">
                    <i className="fa fa-plus" />
                  </span>
                  <span>Add Track to { name }</span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  tracks: state.workstation.tracks,
  channels: state.workstation.channels,
  synths: state.workstation.synths
});

const mapDispatchToProps = dispatch => ({
  editChannel: (name, trackId) => dispatch(editChannel(name, trackId)),
  editChannelFeatures: (channel, feature, track) => dispatch(editChannelFeatures(channel, feature, track)),
  editChannelSynth: (channel, synth) => dispatch(editChannelSynth(channel, synth)),
  editChannelFill: (channel, feature, fill) => dispatch(editChannelFill(channel, feature, fill))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettings);
