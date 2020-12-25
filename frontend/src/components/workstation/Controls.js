import { connect } from 'react-redux';
import { adjustGlobalSettings } from '../../actions';
import { KEYS } from '../../constants/workstation';

const Controls = ({ hasTracks, globalSettings, adjustGlobalSettings }) => {
  const handleBPM = e => adjustGlobalSettings({ bpm: e.target.value });
  const handleKey = e => adjustGlobalSettings({ key: e.target.value });
  const handleTimesig = top => e => adjustGlobalSettings({
    timesig: top ? [e.target.value, globalSettings.timesig[1]] : Number.isInteger(Math.log(e.target.value) / Math.log(2)) ? [globalSettings.timesig[0], e.target.value] : [...globalSettings.timesig]
  });
  const handleBPMToggle = () => adjustGlobalSettings({
    bpm: globalSettings.bpm > 30 ? globalSettings.bpm - 211 : globalSettings.bpm + 211
  });
  const handleTimesigToggle = () => adjustGlobalSettings({
    timesig: globalSettings.timesig[0] > 0 ? [globalSettings.timesig[0] - 20, globalSettings.timesig[1] - 32] : [globalSettings.timesig[0] + 20, globalSettings.timesig[1] + 32]
  });

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
                      <i className="fa fa-drum"/>
                      &emsp;BPM: <span className="text-monospace">{ globalSettings.bpm < 30 ? 'N/A' : globalSettings.bpm }</span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="bpm-dropup">
                      <div className="container mt-15">
                        <div className="form-group">
                          <label htmlFor="bpm">Set BPM</label>
                          <br />
                          <div className="custom-switch align-self-center">
                            <input type="checkbox" id="bpm-toggle" checked={ globalSettings.bpm >= 30 } onChange={ handleBPMToggle } />
                            <label htmlFor="bpm-toggle"> </label>
                          </div>
                          <br />
                          <input type="number" className="form-control" id="bpm" min="30" max="240" disabled={ globalSettings.bpm < 30 } placeholder={ globalSettings.bpm < 30 ? globalSettings.bpm + 211 : globalSettings.bpm } onChange={ handleBPM } />
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
                      <i className="fa fa-hashtag"/>
                      &emsp;Key: { <span dangerouslySetInnerHTML={ { __html: KEYS[globalSettings.key] } } /> }
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
                            <option value="none">None</option>
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
                {/*<i className="fa fa-play" />*/ }
                {/* TODO: Toggle button color */ }
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="row h-full">
              <div className="col-12 d-flex justify-content-center">
                <div className="h-full w-full d-flex justify-content-center">
                  <div className="dropdown dropup with-arrow align-self-center">
                    <button className="btn btn-lg d-flex align-items-center" data-toggle="dropdown" type="button" id="timesig-dropup">
                      <i className="fa fa-stopwatch"/>
                      &emsp;Time Signature:&nbsp;
                      <span className="supsub">
                        <sup>{ globalSettings.timesig[0] <= 0 ? 'N/A' : globalSettings.timesig[0] }</sup>
                        <sub>{ globalSettings.timesig[1] <= 0 ? 'N/A' : globalSettings.timesig[1] }</sub>
                      </span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="timesig-dropup">
                      <div className="container mt-15">
                        <div className="form-group">
                          <label htmlFor="timesig">Set Time Signature</label>
                          <br />
                          <div className="custom-switch align-self-center">
                            <input type="checkbox" id="timesig-toggle" checked={ globalSettings.timesig[0] <= 0 } onChange={ handleTimesigToggle } />
                            <label htmlFor="timesig-toggle"> </label>
                          </div>
                          <br />
                          <input type="number" className="form-control" id="timesig" min="1" max="20" placeholder={ globalSettings.timesig[0] <= 0 ? 'N/A' : globalSettings.timesig[0] } onChange={ handleTimesig(true) } />
                          <input type="number" className="form-control" id="timesig-bottom" min="1" max="32" placeholder={ globalSettings.timesig[1] <= 0 ? 'N/A' : globalSettings.timesig[1] } onChange={ handleTimesig(false) } />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
