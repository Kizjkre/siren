import Window from '../../Window';
import { connect } from 'react-redux';
import { editTrack } from '../../../actions';

const TrackSettingsWindow = ({ id, trackId, tracks, editTrack }) => {
  return (
    <Window id={ id } title={ `Track Settings: ${ tracks[trackId].name }` }>
      <div className="box">

      </div>
      <div className="box">
        <h5 className="is-5">
          { tracks[trackId].settings.continuous ? 'Continuous' : 'Discrete' }
        </h5>
        <label className="checkbox">
          <input
            className="mr-2"
            type="checkbox"
            checked={ tracks[trackId].settings.continuous }
            onChange={ e => editTrack(trackId, { continuous: !tracks[trackId].settings.continuous }) }
          />
          { tracks[trackId].settings.continuous ? 'Continuous' : 'Discrete' }
        </label>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  tracks: state.workstation.tracks
});

const mapDispatchToProps = dispatch => ({
  editTrack: (id, settings) => dispatch(editTrack(id, settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSettingsWindow);
