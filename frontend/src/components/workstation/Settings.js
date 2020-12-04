import { useState } from 'react';
import { connect } from 'react-redux';

const Settings = ({ column, i }) => {
  const [state, setState] = useState({
    mute: false,
    volume: 50
  });

  const handleMute = () => setState({ ...state, mute: !state.mute });
  const handleVolume = e => setState({...state, volume: e.target.value});

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
              <input type="checkbox" id={ `${ column }-row-${ i }-mute` } checked={ !state.mute } onChange={ handleMute }/>
              <label htmlFor={ `${ column }-row-${ i }-mute` }> </label>
            </div>
          </div>
          <div className="col-6">
            <div className="h-full d-flex align-content-start">
              <input disabled={ state.mute } className={ state.mute ? 'disabled' : '' } type="range" min="0" max="100" onMouseUp={ handleVolume } />
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

export default connect()(Settings);