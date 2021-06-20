import { useState } from 'react';
import Window from '../../Window';
import { connect } from 'react-redux';
import { setKey } from '../../../actions';
import { KEYS } from '../../../constants/workstation';

const KeyWindow = ({ currentKey, setKey }) => {
  const [tempKey, setTempKey] = useState();

  return (
    <Window
      id="window-key"
      title="Change Key"
      buttons={ [
        {
          close: true,
          color: 'is-success',
          disabled: !tempKey,
          text: 'Change Key',
          onClick: () => {
            setKey(tempKey);
            setTempKey(null);
          }
        }
      ] }
    >
      <div className="select">
        <select onChange={ e => setTempKey(e.target.value) } defaultValue={ currentKey }>
          { Object.keys(KEYS).map(k => <option value={ k } key={ k } dangerouslySetInnerHTML={ { __html: KEYS[k] } } />) }
        </select>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  currentKey: state.workstation.settings.key
});

const mapDispatchToProps = dispatch => ({
  setKey: key => dispatch(setKey(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(KeyWindow);
