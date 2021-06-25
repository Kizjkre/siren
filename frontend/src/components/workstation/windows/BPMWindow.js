import { useState } from 'react';
import Window from '../../Window';
import { connect } from 'react-redux';
import { setBPM } from '../../../actions';

const BPMWindow = ({ bpm, setBPM }) => {
  const [tempBPM, setTempBPM] = useState();

  return (
    <Window
      id="window-bpm"
      title="Change BPM"
      buttons={ [
        {
          close: true,
          color: 'is-success',
          disabled: !tempBPM,
          text: 'Change BPM',
          onClick: () => setBPM(parseInt(tempBPM))
        }
      ] }
    >
      <input
        className="input is-fullwidth"
        type="number"
        placeholder={ `Current BPM: ${ bpm }` }
        min="0"
        onChange={ e => setTempBPM(e.target.value) }
      />
    </Window>
  );
};

const mapStateToProps = state => ({
  bpm: state.workstation.settings.bpm
});

const mapDispatchToProps = dispatch => ({
  setBPM: bpm => dispatch(setBPM(bpm))
});

export default connect(mapStateToProps, mapDispatchToProps)(BPMWindow);
