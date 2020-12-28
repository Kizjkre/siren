import { useState, useEffect } from 'react';
import Window from './Window';
import Info from './Info';
import { connect } from 'react-redux';
import { adjustGlobalSettings, adjustSettings, focusWindow } from '../../../actions';
import { channel, data as dataInfo } from '../helper/info';

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

const Sonification = ({ anchor, trackno, tracks, settings, adjustSettings, files, globalSettings, adjustGlobalSettings, focusWindow }) => {
  const [state, setState] = useState({ title: '', children: null });

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
        continuous: e.target.checked
      }
    });

  const handleAdd = () => adjustGlobalSettings({ channels: globalSettings.channels + 1 });

  const handleChannel = i => e => {
    if (e.target.classList.contains('btn-primary')) {
      e.target.classList.remove('btn-primary');
      adjustSettings({
        i: trackno,
        settings: {
          channel: [...settings[trackno].channel].splice(settings[trackno].channel.indexOf(i))
        }
      });
    } else {
      e.target.classList.add('btn-primary');
      adjustSettings({
        i: trackno,
        settings: {
          channel: [...settings[trackno].channel, i]
        }
      });
    }
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
          selected: settings[trackno].selected.length === 1 ? [...data] : [...settings[trackno].selected].splice(settings[trackno].selected.indexOf(datum), 1)
        }
      });
    } else {
      e.target.classList.add('datum-selected');
      select(e.target, globalSettings.dark);
      adjustSettings({
        i: trackno,
        settings: {
          selected: settings[trackno].selected.length === data.length ? [datum] : [...settings[trackno].selected, datum]
        }
      });
    }
  };

  const handleInfo = (title, children) => () => {
    setState({ ...state, title, children });
    focusWindow('#help-window');
  };

  return (
    <>
      <Window anchor={ anchor } title={ `${ tracks[trackno].name }: Sonification Settings` }>
        <h5 className="font-weight-bold d-flex align-items-baseline">
          { settings[trackno].continuous ? 'Continuous' : 'Discrete' }&emsp;
          <i className="fa fa-question-circle anchor" data-toggle="modal" data-target="help-window" />
        </h5>
        <div className="d-flex w-full justify-items-center align-items-center">
          <div className="custom-switch">
            <input type="checkbox" id="continuous" value={ settings[trackno].continuous } onChange={ handleContinuousOrDiscrete } />
            <label htmlFor="continuous" />
          </div>
        </div>
        <br />
        <hr />
        <h5 className="font-weight-bold d-flex align-items-baseline">
          Connect to Channel&emsp;
          <i className="fa fa-question-circle anchor" data-toggle="modal" data-target="help-window" onClick={ handleInfo('Connect to Channel', channel) } />
        </h5>
        <div className="w-full">
          <button className="btn btn-square btn-primary m-5" onClick={ handleAdd }>+</button>
          { [...Array(globalSettings.channels).keys()].map(i => <button key={ `channel-${ i }` } className="btn btn-square m-5" onClick={ handleChannel(i) }>{ i }</button>) }
        </div>
        <br />
        <hr />
        <h5 className="font-weight-bold d-flex align-items-baseline">
          Data Processing&emsp;
          <i className="fa fa-question-circle anchor" data-toggle="modal" data-target="help-window" onClick={ handleInfo('Data Processing', dataInfo) } />
        </h5>
        <h6 className="font-weight-semi-bold">Data Points</h6>
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
      <Info title={ state.title }>
        { state.children }
      </Info>
    </>
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
  adjustGlobalSettings: payload => dispatch(adjustGlobalSettings(payload)),
  focusWindow: payload => dispatch(focusWindow(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sonification);
