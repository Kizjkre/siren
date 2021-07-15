import { connect } from 'react-redux';
import { editTrack, deleteTrack, focusWindow } from '../../../actions';

const Settings = ({ id, tracks, editTrack, deleteTrack, focusWindow }) => {

  const handleMute = () => editTrack(id, { mute: !tracks[id].settings.mute });
  const handleVolume = e => editTrack(id, { volume: e.target.value });
  const handlePan = e => editTrack(id, { pan: Math.abs(e.target.value) < 5 ? 0 : parseInt(e.target.value) });
  const handleDelete = () => deleteTrack(id);
  const handleClick = () => focusWindow(`window-sonification-${ tracks[id].name }`);

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
  tracks: state.workstation.tracks
});

const mapDispatchToProps = dispatch => ({
  editTrack: (id, settings) => dispatch(editTrack(id, settings)),
  deleteTrack: id => dispatch(deleteTrack(id)),
  focusWindow: window => dispatch(focusWindow(window))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
