import { connect } from 'react-redux';
import { editTrack, deleteTrack, focusWindow, editTrackData } from '../../../actions';
import profileParser from '../../../helper/profile/profileParser';
import SimpleCodeGenerator from '../../../helper/profile/SimpleCodeGenerator';
import { extremes, median, mode } from '../../../helper/processing';

const Settings = ({ id, tracks, profiles, editTrackData, editTrack, deleteTrack, focusWindow }) => {
  const extr = extremes(tracks[id].data);
  const med = median(tracks[id].data);
  const generator = new SimpleCodeGenerator(null, {
    MIN: extr[0],
    MAX: extr[1],
    MEAN: tracks[id].data.reduce((acc, datum) => acc + datum) / tracks[id].data.length,
    MEDIAN: med,
    MODE: mode(tracks[id].data),
    Q1: median(tracks[id].data.filter(datum => datum < med)),
    Q3: median(tracks[id].data.filter(datum => datum > med))
  });

  const handleMute = () => editTrack(id, { mute: !tracks[id].settings.mute });
  const handleVolume = e => editTrack(id, { volume: e.target.value });
  const handlePan = e => editTrack(id, { pan: Math.abs(e.target.value) < 5 ? 0 : parseInt(e.target.value) });
  const handleDelete = () => deleteTrack(id);
  const handleClick = () => focusWindow(`window-sonification-${ tracks[id].name }`);
  const handleProfile = e => {
    editTrack(id, { profile: e.target.value });
    generator.tree = profileParser(profiles[e.target.value].map).tree;
    editTrackData(id, tracks[id].data.map(datum => {
      generator.x = datum;
      return generator.generate();
    }));
  };

  return (
    <details className="message">
      <summary className="message-header">
        <span className="icon-text">
          <span className="icon">
            <i className="fa fa-cog" />
          </span>
          <span>Settings</span>
        </span>
      </summary>
      <div className="message-body">
        {
          tracks[id].settings.channel.length > 0 ? null : (
            <>
              <div className="box">
                <h5 className="is-size-5">Volume</h5>
                <div className="columns">
                  <div className="column is-3">
                    <div className="level h-100">
                      <div className="level-item">
                        <label className="checkbox">
                          <input
                            className="mr-2"
                            type="checkbox"
                            checked={ tracks[id].settings.mute }
                            onChange={ handleMute }
                          />
                          Mute
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <input
                      className="slider is-fullwidth"
                      disabled={ tracks[id].settings.mute }
                      step="1"
                      min="0"
                      max="100"
                      defaultValue="100"
                      type="range"
                      onMouseUp={ handleVolume }
                    />
                  </div>
                </div>
              </div>
              <div className="box">
                <h5 className="is-size-5">Pan</h5>
                <input
                  className="slider is-fullwidth"
                  type="range"
                  min="-50"
                  max="50"
                  value={ tracks[id].settings.pan }
                  onChange={ handlePan }
                />
              </div>
            </>
          )
        }
        <div className="level">
          <div className="level-item">
            <div className="field">
              <label className="label" htmlFor={ `profile-select-${ id }` }>Select Profile</label>
              <div className="control">
                <div className="select">
                  <select
                    name={ `profile-select-${ id }` }
                    defaultValue={ tracks[id].settings.profile }
                    onChange={ handleProfile }
                  >
                    {
                      Object.keys(profiles).map(name =>
                        <option key={ name } value={ name }>{ name }</option>
                      )
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <button onClick={ handleClick } className="button is-primary">
              Sonification Settings<br />(Advanced)
            </button>
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <button onClick={ handleDelete } className="button is-danger is-small">
              <span className="icon">
                <i className="fa fa-trash" />
              </span>
              <span>Delete Track</span>
            </button>
          </div>
        </div>
      </div>
    </details>
  );
};

const mapStateToProps = state => ({
  tracks: state.workstation.tracks,
  profiles: state.workstation.profiles
});

const mapDispatchToProps = dispatch => ({
  editTrackData: (id, data) => dispatch(editTrackData(id, data)),
  editTrack: (id, settings) => dispatch(editTrack(id, settings)),
  deleteTrack: id => dispatch(deleteTrack(id)),
  focusWindow: window => dispatch(focusWindow(window))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
