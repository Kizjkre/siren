import { useState } from 'react';
import Window from '../../Window';
import { connect } from 'react-redux';
import { setTimesig } from '../../../actions';

const TimesigWindow = ({ timesig, setTimesig }) => {
  const [tempTimesig, setTempTimesig] = useState([null, null]);

  return (
    <Window
      id="window-timesig"
      title="Change Time Signature"
      buttons={ [
        {
          close: true,
          color: 'is-success',
          disabled: !tempTimesig[0] && !tempTimesig[1],
          text: 'Change BPM',
          onClick: () => setTimesig(tempTimesig)
        }
      ] }
    >
      <div className="block">
        <input
          className="input is-fullwidth"
          type="number"
          placeholder={ `Current Time Signature: ${ timesig[0] }` }
          min="0"
          onChange={ e => setTempTimesig([e.target.value, tempTimesig[1]]) }
        />
      </div>
      <div className="block">
        <input
          className="input is-fullwidth"
          type="number"
          placeholder={ `Current Time Signature: ${ timesig[1] }` }
          min="0"
          onChange={ e => setTempTimesig([tempTimesig[0], e.target.value]) }
        />
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  timesig: state.workstation.settings.timesig
});

const mapDispatchToProps = dispatch => ({
  setTimesig: bpm => dispatch(setTimesig(bpm))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimesigWindow);
