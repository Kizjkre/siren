import { connect } from 'react-redux';
import { adjustSettings, deleteTrack, focusWindow } from '../../actions';

const Settings = ({ column, i, tracks, settings, adjustSettings, deleteTrack, focusWindow }) => {
  const handleMute = () => adjustSettings({ i, settings: { mute: !settings[i].mute} });
  const handleVolume = e => adjustSettings({ i, settings: { volume: e.target.value } });
  const handlePan = e => adjustSettings({ i, settings: { pan: Math.abs(e.target.value) < 5 ? 0 : parseInt(e.target.value) } });
  const handleDelete = () => deleteTrack(tracks[i]);
  const handleClick = () => focusWindow(`#sonification-${ tracks[i].name }-${ i }`);

  return (
    <details className="collapse-panel">
      <summary className="collapse-header">
        <i className="fa fa-cog"/>
        &emsp;Settings
      </summary>
      <div className="collapse-content">
        <h6 className="font-weight-semi-bold">Volume</h6>
        <div className="row">
          <div className="col-3">
            <div className="custom-switch">
              <input type="checkbox" id={ `${ column }-row-${ i }-mute` } checked={ !settings[i].mute } onChange={ handleMute } />
              <label htmlFor={ `${ column }-row-${ i }-mute` }> </label>
            </div>
          </div>
          <div className="col-9">
            <div className="h-full d-flex align-content-start">
              <input disabled={ settings[i].mute } className={ settings[i].mute ? 'disabled' : '' } type="range" min="0" max="100" defaultValue="100" onMouseUp={ handleVolume } />
            </div>
          </div>
        </div>
        <br />
        <hr />
        <h6 className="font-weight-semi-bold">Pan</h6>
        <div className="h-full d-flex align-content-start">
          <input type="range" min="-50" max="50" value={ settings[i].pan } onChange={ handlePan } />
        </div>
        <br />
        <hr />
        <button onClick={ handleClick } data-toggle="modal" data-target={ `sonification-${ tracks[i].name }-${ i }` } className="btn btn-block btn-primary">Sonification Settings (Advanced)</button>
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
  tracks: state.tracks,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  adjustSettings: payload => dispatch(adjustSettings(payload)),
  deleteTrack: payload => dispatch(deleteTrack(payload)),
  focusWindow: payload => dispatch(focusWindow(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
