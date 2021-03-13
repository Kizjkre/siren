import { connect } from 'react-redux';
import { setSettings, deleteTrack, focusWindow } from '../../actions';

const Settings = ({ column, i, tracks, setSettings, deleteTrack, focusWindow }) => {
  const handleMute = () => setSettings(i, { mute: !tracks[i].settings.mute });
  const handleVolume = e => setSettings(i, { volume: e.target.value });
  const handlePan = e => setSettings(i, { pan: Math.abs(e.target.value) < 5 ? 0 : parseInt(e.target.value) });
  const handleDelete = () => deleteTrack(i);
  const handleClick = () => focusWindow(`#sonification-${ tracks[i].name }-${ i }`);

  return (
    <details className="collapse-panel">
      <summary className="collapse-header">
        <i className="fa fa-cog"/>
        &emsp;Settings
      </summary>
      <div className="collapse-content">
        {
          tracks[i].settings.channel.length > 0 ? null : (
            <>
              <h6 className="font-weight-semi-bold">Volume</h6>
              <div className="row">
                <div className="col-3">
                  <div className="custom-switch">
                    <input type="checkbox" id={ `${ column }-row-${ i }-mute` } checked={ !tracks[i].settings.mute } onChange={ handleMute } />
                    <label htmlFor={ `${ column }-row-${ i }-mute` }> </label>
                  </div>
                </div>
                <div className="col-9">
                  <div className="h-full d-flex align-content-start">
                    <input disabled={ tracks[i].settings.mute } className={ tracks[i].settings.mute ? 'disabled' : '' } type="range" min="0" max="100" defaultValue="50" onMouseUp={ handleVolume } />
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <h6 className="font-weight-semi-bold">Pan</h6>
              <div className="h-full d-flex align-content-start">
                <input type="range" min="-50" max="50" value={ tracks[i].settings.pan } onChange={ handlePan } />
              </div>
              <br />
              <hr />
            </>
          )
        }
        <button onClick={ handleClick } data-toggle="modal" data-target={ `sonification-${ tracks[i].name.replace(/\s/g, '-') }-${ i }` } className="btn btn-block btn-primary">Sonification Settings (Advanced)</button>
        <br />
        <hr />
        <button onClick={ handleDelete } className="btn btn-block btn-danger">
          <i className="fa fa-trash" />
          &emsp;Delete Track
        </button>
      </div>
    </details>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks
});

const mapDispatchToProps = dispatch => ({
  setSettings: (id, settings) => dispatch(setSettings(id, settings)),
  deleteTrack: id => dispatch(deleteTrack(id)),
  focusWindow: window => dispatch(focusWindow(window))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
