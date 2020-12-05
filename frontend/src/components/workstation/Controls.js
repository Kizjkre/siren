import { connect } from 'react-redux';
import { adjustGlobalSettings } from '../../actions';
import { KEYS } from '../../constants/workstation-styles';

const Controls = ({ hasTracks, globalSettings, adjustGlobalSettings }) => {
  const handleBPM = e => adjustGlobalSettings({ ...globalSettings, bpm: e.target.value });
  const handleKey = e => adjustGlobalSettings({ ...globalSettings, key: e.target.value });

  return (
    <nav className="navbar navbar-fixed-bottom controls">
      <div className="navbar-content w-full">
        <div className="row w-full">
          <div className="col-4">
            <div className="row h-full">
              <div className="col-6 d-flex justify-content-center">
                <div className="h-full w-full d-flex justify-content-center">
                  <div className="dropdown dropup with-arrow align-self-center">
                    <button className="btn btn-lg" data-toggle="dropdown" type="button" id="bpm-dropup">
                      <i className="fa fa-drum" />
                      &emsp;BPM: <span className="text-monospace">{ globalSettings.bpm }</span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="bpm-dropup">
                      <div className="container mt-15">
                        <div className="form-group">
                          <label htmlFor="bpm">Set BPM</label>
                          <input type="number" className="form-control" id="bpm" min="30" max="240" placeholder={ globalSettings.bpm } onChange={ handleBPM } />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <div className="h-full w-full d-flex justify-content-center">
                  <div className="dropdown dropup with-arrow align-self-center">
                    <button className="btn btn-lg" data-toggle="dropdown" type="button" id="key-dropup">
                      <i className="fa fa-hashtag" />
                      &emsp;Key: { KEYS[globalSettings.key] }
                    </button>
                    <div className="dropdown-menu" aria-labelledby="key-dropup">
                      <div className="container mt-15">
                        <div className="form-group">
                          <label htmlFor="key">Set Key</label>
                          <select className="form-control" id="key" onChange={ handleKey }>
                            <option value="C">C Major</option>
                            <option value="c">C Minor</option>
                            <option value="C#">C# Major</option>
                            <option value="c#">C# Minor</option>
                            <option value="D">D Major</option>
                            <option value="d">D Minor</option>
                            <option value="Eb">E&#9837; Major</option>
                            <option value="eb">E&#9837; Minor</option>
                            <option value="E">E Major</option>
                            <option value="e">E Minor</option>
                            <option value="F">F Major</option>
                            <option value="f">F Minor</option>
                            <option value="F#">F# Major</option>
                            <option value="f#">F# Minor</option>
                            <option value="G">G Major</option>
                            <option value="g">G Minor</option>
                            <option value="Ab">A&#9837; Major</option>
                            <option value="ab">A&#9837; Minor</option>
                            <option value="A">A Major</option>
                            <option value="a">A Minor</option>
                            <option value="Bb">B&#9837; Major</option>
                            <option value="bb">B&#9837; Minor</option>
                            <option value="B">B Major</option>
                            <option value="b">B Minor</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="w-full d-flex justify-content-center">
              <button className="btn btn-square rounded-circle btn-success play font-size-24" type="button" disabled={ !hasTracks }>
                {/*<i className="fa fa-play" />*/}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  globalSettings: state.globalSettings,
  hasTracks: state.tracks.length !== 0
});

const mapDispatchToProps = dispatch => ({
  adjustGlobalSettings: payload => dispatch(adjustGlobalSettings(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);