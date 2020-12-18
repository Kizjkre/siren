import Window from './Window';
import { connect } from 'react-redux';
import { adjustSettings } from '../../actions';

const Sonification = ({ anchor, trackno, tracks, settings, adjustSettings }) => {
  const handleContinuousOrDiscrete = e =>
    adjustSettings({
      i: trackno,
      settings: {
        ...settings[trackno],
        continuous: e.target.checked
      }
    });

  return (
    <Window anchor={ anchor } title={ `${ tracks[trackno].name }: Sonification Settings` }>
      <h5 className="font-weight-bold">{ settings[trackno].continuous ? 'Continuous' : 'Discrete' }</h5>
      <div className="d-flex w-full justify-items center align-items-center">
        <div className="custom-switch">
          <input type="checkbox" id="continuous" value={ settings[trackno].continuous } onChange={ handleContinuousOrDiscrete } />
          <label htmlFor="continuous" />
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
