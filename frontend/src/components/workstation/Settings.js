import { connect } from 'react-redux';
import { adjustSettings } from '../../actions';

const Settings = ({ column, i, settings, adjustSettings }) => {
  const handleMute = () => adjustSettings({ i, settings: { ...settings[i].settings, mute: !settings[i].settings.mute} });
  const handleVolume = e => adjustSettings({ i, settings: { ...settings[i].settings, volume: e.target.value } });

  return (
    <details className="collapse-panel">
      <summary className="collapse-header">
        <i className="fa fa-cog"/>
        &emsp;Settings
      </summary>
      <div className="collapse-content">
        <h6 className="font-weight-semi-bold">Volume</h6>
        <div className="row">
          <div className="col-6">
            <div className="custom-switch">
              <input type="checkbox" id={ `${ column }-row-${ i }-mute` } checked={ !settings[i].settings.mute } onChange={ handleMute }/>
              <label htmlFor={ `${ column }-row-${ i }-mute` }> </label>
            </div>
          </div>
          <div className="col-6">
            <div className="h-full d-flex align-content-start">
              <input disabled={ settings[i].settings.mute } className={ settings[i].settings.mute ? 'disabled' : '' } type="range" min="0" max="100" onMouseUp={ handleVolume } />
            </div>
          </div>
        </div>
      </div>
    </details>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  adjustSettings: payload => dispatch(adjustSettings(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);