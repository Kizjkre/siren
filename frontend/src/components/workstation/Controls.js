import { connect } from 'react-redux';
import { setGlobalSettings } from '../../actions';
import { KEYS } from '../../constants/workstation';
import { play, pause, stop } from './helper/synth';

const Controls = ({ globalSettings, setGlobalSettings, tracks }) => {
  const hasTracks = tracks.length !== 0;

  const handleBPM = e => setGlobalSettings({ bpm: e.target.value.length === 0 ? 30 : parseInt(e.target.value) });

  const handleKey = e => setGlobalSettings({ key: e.target.value });

  const handleTimesig = top => e => setGlobalSettings({
    timesig: top ? [e.target.value, globalSettings.timesig[1]] : Number.isInteger(Math.log(e.target.value) / Math.log(2)) ? [globalSettings.timesig[0], e.target.value] : [...globalSettings.timesig]
  });

  const handleBPMToggle = () => setGlobalSettings({ bpm: globalSettings.bpm > 0 ? -1 : 120 });

  const handleTimesigToggle = () => setGlobalSettings({ timesig: globalSettings.timesig[0] > 0 ? [-1, -1] : [4, 4] });

  const handlePlay = e => {
    if (e.target.classList.contains('btn-danger')) {
      e.target.classList.add('btn-success');
      e.target.classList.remove('btn-danger');

      stop();
    } else if (e.target.classList.contains('btn-secondary')) {
      e.target.classList.add('btn-danger');
      e.target.classList.remove('btn-secondary');

      pause();
    } else {
      e.target.classList.add('btn-danger'); // TODO: fix
      e.target.classList.remove('btn-success');

      const output = [];

      tracks.forEach(t => {
        if (t.settings.channel.length === 0) {
          output.push(t);
        } else {
          // TODO: Do something
        }
      });

      play(output, globalSettings);
    }
  };

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
                      &emsp;BPM: <span className="text-monospace">{ globalSettings.bpm < 0 ? 'N/A' : globalSettings.bpm }</span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="bpm-dropup">
                      <div className="container mt-15">
                        <div className="form-group w-full">
                          <label htmlFor="bpm">Set BPM</label>
                          <br />
                          <div className="custom-switch align-self-center">
                            <input type="checkbox" id="bpm-toggle" checked={ globalSettings.bpm > 0 } onChange={ handleBPMToggle } />
                            <label htmlFor="bpm-toggle" />
                          </div>
                          <br />
                          <input type={ globalSettings.bpm < 0 ? 'text' : 'number' } className="form-control" id="bpm" min="30" max="240" value={ globalSettings.bpm < 0 ? 'N/A' : globalSettings.bpm } disabled={ globalSettings.bpm < 0 } placeholder="BPM" onChange={ handleBPM } />
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
                            { Object.keys(KEYS).map(k => <option value={ k } key={ k } dangerouslySetInnerHTML={ { __html: KEYS[k] } } />) }
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
              <button className="btn btn-square rounded-circle btn-success play font-size-24" type="button" disabled={ !hasTracks } onClick={ handlePlay }>
                { /*<i className="fa fa-play" />*/ }
                { /* TODO: Toggle button color */ }
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
                            <input type="checkbox" id="timesig-toggle" checked={ globalSettings.timesig[0] > 0 } onChange={ handleTimesigToggle } />
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
  tracks: state.tracks
});

const mapDispatchToProps = dispatch => ({
  setGlobalSettings: payload => dispatch(setGlobalSettings(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
