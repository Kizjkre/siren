import Window from './Window';
import { connect } from 'react-redux';
import { adjustSettings } from '../../actions';

const Sonification = ({ anchor, trackno, tracks, settings, adjustSettings }) => {
  const handlePitch = toggle => e =>
    adjustSettings({
      i: trackno,
      settings: {
        ...settings[trackno].settings,
        pitch: toggle ? (settings[trackno].settings.pitch < 0 ? settings[trackno].settings.pitch + 100 : settings[trackno].settings.pitch - 100) : e.target.value
      }
    });
  const handleRhythm = (toggle, size, type) => e =>
    adjustSettings({
      i: trackno,
      settings: {
        ...settings[trackno].settings,
        rhythm: {
          ...settings[trackno].settings.rhythm,
          size: size ? e.target.value : settings[trackno].settings.rhythm.size,
          type: toggle ?
            (settings[trackno].settings.type < 0 ?
              settings[trackno].settings.type + 100 :
              settings[trackno].settings.type - 100) :
            (type ? e.target.value : settings[trackno].settings.rhythm.type)
        }
      }
    });
  
  return (
    <Window anchor={ anchor } title={ `${ tracks[trackno].name }: Sonification Settings` }>
      <h5 className="font-weight-bold">Pitch</h5>
      <div className="row">
        <div className="col-3 d-flex">
          <div className="custom-switch align-self-center">
            <input type="checkbox" checked={ settings[trackno].settings.pitch >= 0 } onChange={ handlePitch(true) } id={ `sonification-${ trackno }-pitch` } />
            <label htmlFor={ `sonification-${ trackno }-pitch` }> </label>
          </div>
        </div>
        <div className="col-9">
          <select className="form-control" defaultValue="0" disabled={ settings[trackno].settings.pitch < 0 }>
            <option value="0">Higher values map to higher pitches</option>
            <option value="1">Lower values map to higher pitches</option>
            <option value="2">Higher moving averages map to higher pitches</option>
            <option value="3">Lower moving averages map to higher pitches</option>
            <option value="4">Longer cell value lengths map to higher pitches</option>
            <option value="5">Shorter cell value lengths map to higher pitches</option>
          </select>
        </div>
      </div>
      <br />
      <hr />
      <h5 className="font-weight-bold">Rhythm</h5>
      <div className="row">
        <div className="col-3 d-flex">
          <div className="custom-switch align-self-center">
            <input type="checkbox" checked={ settings[trackno].settings.rhythm.type >= 0 } onChange={ handleRhythm(true, false, false) } id={ `sonification-${ trackno }-rhythm` } />
            <label htmlFor={ `sonification-${ trackno }-rhythm` }> </label>
          </div>
        </div>
        <div className="col-9">
          <input type="number" className="form-control" placeholder="Segmentation Size" onChange={ handleRhythm(false, true, false) } />
        </div>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  adjustSettings: payload => dispatch(adjustSettings(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sonification);