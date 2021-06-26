import Window from '../../Window';
import { connect } from 'react-redux';
import { editTrack, editTrackData } from '../../../actions';
import { deepClone, isNumerical, removeOutliers } from '../../../helper/processing';

const TrackSettingsWindow = ({ id, trackId, files, tracks, editTrack, editTrackData }) => {
  const data = files[tracks[trackId].file].map(row => row[tracks[trackId].name]);
  const numerical = isNumerical(tracks[trackId].data);
  const worker = new Worker('workers/worker.js');

  worker.onmessage = e => editTrackData(trackId, e.data);

  return (
    <Window id={ id } title={ `Track Settings: ${ tracks[trackId].name }` }>
      <div className="box">
        <h5 className="subtitle is-5">Data Processing</h5>
        <div className="buttons has-addons">
          {
            !numerical ? null : (
              <button
                className="button is-primary"
                onClick={ () => editTrackData(trackId, removeOutliers(tracks[trackId].data)) }
              >
                <span className="icon">
                  <i className="fa fa-chart-line" />
                </span>
                <span>Remove Outliers</span>
              </button>
            )
          }
          <button
            className="button is-primary"
            onClick={ () => editTrackData(trackId, data) }
          >
            <span className="icon">
              <i className="fa fa-chart-area" />
            </span>
            <span>Restore Data</span>
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <tbody>
              <tr>
                <td>{ tracks[trackId].name }</td>
                {
                  data.map((datum, i) => {
                    const selected = tracks[trackId].data.includes(datum);
                    return (
                      <td
                        key={ i }
                        className={ `settings-data ${ selected ? 'settings-data-selected' : '' }` }
                        onClick={ () => {
                          const temp = deepClone(tracks[trackId].data);
                          if (selected) {
                            temp.splice(i, 1);
                          } else {
                            temp.splice(i, 0, datum);
                          }
                          editTrackData(trackId, temp);
                        } }
                      >
                        { datum }
                      </td>
                    );
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
        {
          numerical ? null : (
            <input
              className="input"
              type="number"
              placeholder="Segmentation Size"
              onChange={ e =>
                worker.postMessage({
                  type: 'chunkify',
                  params: [tracks[trackId].data, parseInt(e.target.value)]
                })
              }
            />
          )
        }
      </div>
      <div className="box">
        <h5 className="subtitle is-5">
          { tracks[trackId].settings.continuous ? 'Continuous' : 'Discrete' }
        </h5>
        <label className="checkbox">
          <input
            className="mr-2"
            type="checkbox"
            checked={ tracks[trackId].settings.continuous }
            onChange={ () => editTrack(trackId, { continuous: !tracks[trackId].settings.continuous }) }
          />
          { tracks[trackId].settings.continuous ? 'Continuous' : 'Discrete' }
        </label>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  files: state.workstation.files,
  tracks: state.workstation.tracks
});

const mapDispatchToProps = dispatch => ({
  editTrack: (id, settings) => dispatch(editTrack(id, settings)),
  editTrackData: (id, data) => dispatch(editTrackData(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSettingsWindow);
