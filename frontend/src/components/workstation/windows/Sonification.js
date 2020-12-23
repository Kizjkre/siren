import Window from './Window';
import { connect } from 'react-redux';
import { adjustSettings } from '../../../actions';
import halfmoon from 'halfmoon';

const Sonification = ({ anchor, trackno, tracks, settings, adjustSettings, files }) => {
  const data = files
    .find(file => file.name === tracks[trackno].file).csv
    .map(row => isNaN(row[tracks[trackno].name]) ? row[tracks[trackno].name] : parseFloat(row[tracks[trackno].name]));

  const handleContinuousOrDiscrete = e =>
    adjustSettings({
      i: trackno,
      settings: {
        ...settings[trackno],
        continuous: e.target.checked
      }
    });

  const handleConnect = e => adjustSettings({
    i: trackno,
    settings: {
      ...settings[trackno],
      connect: e.target.value === 'none' ? -1 : e.target.value
    }
  });

  const handlePoint = (datum, i) => e => {
    if (halfmoon.darkModeOn) {
      e.target.style.background = 'var(--dm-table-primary-bg-color)';
      e.target.style.color = 'var(--dm-table-primary-text-color)';
      e.target.style.rowBorder = 'var(--dm-table-primary-row-border-color)';
      e.target.style.cellBorder = 'var(--dm-table-primary-cell-border-color)';
    } else {
      e.target.style.background = 'var(--lm-table-primary-bg-color)';
      e.target.style.color = 'var(--lm-table-primary-text-color)';
      e.target.style.rowBorder = 'var(--lm-table-primary-row-border-color)';
      e.target.style.cellBorder = 'var(--lm-table-primary-cell-border-color)';
    }
  };

  return (
    <Window anchor={ anchor } title={ `${ tracks[trackno].name }: Sonification Settings` }>
      <h5 className="font-weight-bold">{ settings[trackno].continuous ? 'Continuous' : 'Discrete' }</h5>
      <div className="d-flex w-full justify-items center align-items-center">
        <div className="custom-switch">
          <input type="checkbox" id="continuous" value={ settings[trackno].continuous } onChange={ handleContinuousOrDiscrete } />
          <label htmlFor="continuous" />
        </div>
      </div>
      <br />
      <hr />
      <h5 className="font-weight-bold">Connect</h5>
      <div className="d-flex w-full justify-items center align-items-center">
        <select className="form-control" value={ settings[trackno].connect < 0 ? 'none' : settings[trackno].connect } onChange={ handleConnect }>
          <option value="none" disabled>None</option>
          { tracks.map(({ name }, i) => i === trackno ? null : <option key={ name } value={ i }>{ name }</option>) }
        </select>
      </div>
      <br />
      <hr />
      <h5 className="font-weight-bold">Data Processing</h5>
      <h6 className="font-weight-semi-bold">Data Points</h6>
      <div className="w-full overflow-scroll">
        <table className="table">
          <tbody>
          <tr>
            <th>{ tracks[trackno].name }</th>
            { data.map((datum, i) => <td key={ `data-${ i }` } className="anchor sonification-data-point" onClick={ handlePoint(datum, i) }>{ datum }</td>) }
          </tr>
          </tbody>
        </table>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks,
  settings: state.settings,
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  adjustSettings: payload => dispatch(adjustSettings(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sonification);
