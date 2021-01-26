import { useState, useEffect } from 'react';
import Window from './Window';
import Info from './Info';
import Channel from './Channel';
import { connect } from 'react-redux';
import { setGlobalSettings, setSettings, focusWindow, setData } from '../../../actions';
import { channel, data as dataInfo } from '../../../helper/info';
import { chunkify, removeOutliers } from '../../../helper/processing';
import { INITIAL_CHANNEL_SETTINGS } from '../../../constants/state';

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

const Sonification = ({ anchor, trackno, tracks, setSettings, globalSettings, setGlobalSettings, focusWindow, setData, files }) => {
  const [state, setState] = useState({ title: '', children: null, segment: '' });

  useEffect(() => {
    Array.from(document.getElementsByClassName('datum-selected')).forEach(e => select(e, globalSettings.dark));
  }, [globalSettings.dark]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleContinuousOrDiscrete = e => setSettings(trackno, { continuous: e.target.checked });

  const handleAdd = () => setGlobalSettings({ channels: [...globalSettings.channels, { ...INITIAL_CHANNEL_SETTINGS, id: globalSettings.channels.length }] });

  const handleChannel = i => e => {
    if (e.target.classList.contains('btn-primary')) {
      e.target.classList.remove('btn-primary');

      const temp = [...tracks[trackno].settings.channel];
      temp.splice(tracks[trackno].settings.channel.indexOf(i), 1);
      setSettings(trackno, { channel: temp });

      const temp2 = [...globalSettings.channels];
      temp2[i].tracks.splice(temp2[i].tracks.indexOf(trackno), 1);
      setGlobalSettings({ channels: temp2 });
    } else {
      e.target.classList.add('btn-primary');
      setSettings(trackno, { channel: [...tracks[trackno].settings.channel, i].sort((a, b) => a - b) });

      const temp = [...globalSettings.channels];
      temp[i].tracks = [...temp[i].tracks, trackno];
      setGlobalSettings({ channels: temp });
    }
  };

  const handlePoint = (datum, i) => e => {
    const temp = tracks[trackno].data;

    if (e.target.classList.contains('datum-selected')) {
      e.target.classList.remove('datum-selected');
      e.target.style.background = null;
      e.target.style.color = null;
      e.target.style.rowBorder = null;
      e.target.style.cellBorder = null;

      temp.splice(i, 1);
      setData(trackno, temp);
    } else {
      e.target.classList.add('datum-selected');
      select(e.target, globalSettings.dark);
      temp.splice(i, 0, datum);
      setData(trackno, temp);
    }
  };

  const handleInfo = (title, children) => () => {
    setState({ ...state, title, children });
    focusWindow('#help-window');
  };

  const handleOutliers = () => setData(trackno, removeOutliers(tracks[trackno].data));

  const handleRestore = () => {
    setData(trackno, files.find(f => f.name === tracks[trackno].file).csv.map(row => isNaN(row[tracks[trackno].name]) ? row[tracks[trackno].name] : parseFloat(row[tracks[trackno].name])));
    setState({ ...state, segment: '' });
  };

  const handleSegment = e => {
    setData(trackno, chunkify(tracks[trackno].data, e.target.value));
    setState({ ...state, segment: e.target.value });
  };

  return (
    <>
      <Window anchor={ anchor } title={ `${ tracks[trackno].name }: Sonification Settings` } width="50vw">
        <h5 className="font-weight-bold d-flex align-items-baseline">
          Connect to Channel&emsp;
          <i className="fa fa-question-circle anchor" data-toggle="modal" data-target="help-window" onClick={ handleInfo('Connect to Channel', channel) } />
        </h5>
        <div className="w-full">
          <button className="btn btn-square btn-primary m-5" onClick={ handleAdd }>+</button>
          { [...globalSettings.channels].map((_, i) => <button key={ `channel-${ i }` } className="btn btn-square m-5" onClick={ handleChannel(i) }>{ i }</button>) }
        </div>
        {
          tracks[trackno].settings.channel.length === 0 ? null : (
            <>
              <br />
              <div className="w-full">
                <button className="btn btn-primary ml-5" data-toggle="modal" data-target={ `channel-${ tracks[trackno].name }-${ trackno }` } onClick={ () => focusWindow(`#channel-${ tracks[trackno].name }-${ trackno }`) }>Channel Settings</button>
              </div>
            </>
          )
        }
        <br />
        <hr />
        <h5 className="font-weight-bold d-flex align-items-baseline">Data Processing</h5>
        <h6 className="font-weight-semi-bold d-flex align-items-baseline">
          Data Points&emsp;
          <i className="fa fa-question-circle anchor" data-toggle="modal" data-target="help-window" onClick={ handleInfo('Data Points', dataInfo) } />
        </h6>
        <div className="w-full overflow-scroll">
          <table className="table">
            <tbody>
              <tr>
                <th>{ tracks[trackno].name }</th>
                { tracks[trackno].data.map((datum, i) => <td key={ `data-${ i }` } className="anchor sonification-data-point is-primary" onClick={ handlePoint(datum, i) }>{ datum }</td>) }
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <button className="btn btn-primary" onClick={ handleOutliers }>Remove Outliers</button>
          </div>
          <div className="col-6">
            <input className="form-control" placeholder="Segmentation Size" type="number" min="1" value={ state.segment } onChange={ handleSegment } />
          </div>
        </div>
        <br />
        <button className="btn btn-primary" onClick={ handleRestore }>Restore Data</button>
        <br />
        {
          tracks[trackno].settings.channel.length > 0 ? null : (
            <>
              <br />
              <hr />
              <h5 className="font-weight-bold d-flex align-items-baseline">
                { tracks[trackno].settings.continuous ? 'Continuous' : 'Discrete' }&emsp;
                <i className="fa fa-question-circle anchor" data-toggle="modal" data-target="help-window" />
              </h5>
              <div className="d-flex w-full justify-items-center align-items-center">
                <div className="custom-switch">
                  <input type="checkbox" id={ `continuous-${ anchor }` } value={ tracks[trackno].settings.continuous } onChange={ handleContinuousOrDiscrete } />
                  <label htmlFor={ `continuous-${ anchor }` } />
                </div>
              </div>
            </>
          )
        }
      </Window>
      <Info title={ state.title }>
        { state.children }
      </Info>
      <Channel anchor={ `channel-${ tracks[trackno].name.replace(/\s/g, '-') }-${ trackno }` } title={ tracks[trackno].name } i={ trackno } />
    </>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks,
  globalSettings: state.globalSettings,
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  setSettings: (id, settings) => dispatch(setSettings(id, settings)),
  setGlobalSettings: settings => dispatch(setGlobalSettings(settings)),
  focusWindow: window => dispatch(focusWindow(window)),
  setData: (id, data) => dispatch(setData(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sonification);
