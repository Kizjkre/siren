import { useEffect } from 'react';
import Window from './Window';
import { connect } from 'react-redux';
import { adjustGlobalSettings, adjustSettings } from '../../../actions';

const select = (e, dark) => {
  if (dark) {
    e.style.background = 'var(--dm-table-primary-bg-color)';
    e.style.color = 'var(--dm-table-primary-text-color)';
    e.style.rowBorder = 'var(--dm-table-primary-row-border-color)';
    e.style.cellBorder = 'var(--dm-table-primary-cell-border-color)';
  } else {
    e.style.background = 'var(--lm-table-primary-bg-color)';
    e.style.color = 'var(--lm-table-primary-text-color)';
    e.style.rowBorder = 'var(--lm-table-primary-row-border-color)';
    e.style.cellBorder = 'var(--lm-table-primary-cell-border-color)';
  }
};

const Sonification = ({ anchor, trackno, tracks, settings, adjustSettings, files, globalSettings, adjustGlobalSettings }) => {
  useEffect(() => {
    Array.from(document.getElementsByClassName('datum-selected')).forEach(e => select(e, globalSettings.dark));
  }, [globalSettings.dark]); // eslint-disable-line react-hooks/exhaustive-deps

  const data = files
    .find(file => file.name === tracks[trackno].file).csv
    .map(row => row[tracks[trackno].name]);

  const handleContinuousOrDiscrete = e =>
    adjustSettings({
      i: trackno,
      settings: {
        ...settings[trackno],
        continuous: e.target.checked
      }
    });

  const handleAdd = () => adjustGlobalSettings({ ...globalSettings, lines: globalSettings.lines + 1 });

  const handleConnect = e => {
    adjustSettings({
      i: trackno,
      settings: {
        ...settings[trackno],
        connect: e.target.value === 'none' ? -1 : e.target.value
      }
    });
  };

  const handlePoint = datum => e => {
    if (e.target.classList.contains('datum-selected')) {
      e.target.classList.remove('datum-selected');
      e.target.style.background = null;
      e.target.style.color = null;
      e.target.style.rowBorder = null;
      e.target.style.cellBorder = null;

      adjustSettings({
        i: trackno,
        settings: {
          ...settings[trackno],
          selected: settings[trackno].selected.length === 1 ? [...data] : [...settings[trackno].selected].splice(settings[trackno].selected.indexOf(datum), 1)
        }
      });
    } else {
      e.target.classList.add('datum-selected');
      select(e.target, globalSettings.dark);
      adjustSettings({
        i: trackno,
        settings: {
          ...settings[trackno],
          selected: settings[trackno].selected.length === data.length ? [datum] : [...settings[trackno].selected, datum]
        }
      });
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
        <button className="btn btn-square btn-primary" onClick={ handleAdd }>+</button>
        { [...Array(globalSettings.lines).keys()].map(i => <button className="btn btn-square">{ i }</button>) }
      </div>
      <br />
      <hr />
      <h5 className="font-weight-bold">Data Processing</h5>
      <h6 className="font-weight-semi-bold">Data Points</h6>
      <p className="text-muted">Select a subset of the data to sonify, deselecting all points sonifies the entire dataset.</p>
      <div className="w-full overflow-scroll">
        <table className="table">
          <tbody>
            <tr>
              <th>{ tracks[trackno].name }</th>
              { data.map((datum, i) => <td key={ `data-${ i }` } className="anchor sonification-data-point" onClick={ handlePoint(datum) }>{ datum }</td>) }
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
  files: state.files,
  globalSettings: state.globalSettings
});

const mapDispatchToProps = dispatch => ({
  adjustSettings: payload => dispatch(adjustSettings(payload)),
  adjustGlobalSettings: payload => dispatch(adjustGlobalSettings(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sonification);
