import { useState } from 'react';
import BPMWindow from './windows/BPMWindow';
import KeyWindow from './windows/KeyWindow';
import TimesigWindow from './windows/TimesigWindow';
import { connect } from 'react-redux';
import { focusWindow } from '../../actions';
import { KEYS, PLAYING_STATUS } from '../../constants/workstation';
import { play, pause, stop } from '../../synth/synth';
import ChannelWindow from './windows/ChannelWindow';

const Controls = ({ settings, focusWindow, disabled }) => {
  const [status, setStatus] = useState(PLAYING_STATUS.STOPPED);

  const handlePlay = e => {
    switch (e.target.getAttribute('data-status')) {
      case PLAYING_STATUS.STOPPED + '':
        stop();
        setStatus(PLAYING_STATUS.STOPPED);
        break;
      case PLAYING_STATUS.PLAYING + '':
        (async () => await play())();
        setStatus(PLAYING_STATUS.PLAYING);
        break;
      case PLAYING_STATUS.PAUSED + '':
        pause();
        setStatus(PLAYING_STATUS.PAUSED);
        break;
      default:
        break;
    }
  };

  const buttons = {
    [PLAYING_STATUS.STOPPED]: (
      <button
        data-status={ PLAYING_STATUS.STOPPED }
        className="button is-danger is-large mx-1"
        onClick={ handlePlay }
        disabled={ disabled }
      >
        <span className="icon" data-status={ PLAYING_STATUS.STOPPED }>
          <i className="fa fa-stop" data-status={ PLAYING_STATUS.STOPPED } />
        </span>
      </button>
    ),
    [PLAYING_STATUS.PLAYING]: (
      <button
        data-status={ PLAYING_STATUS.PLAYING }
        className="button is-success is-large mx-1"
        onClick={ handlePlay }
        disabled={ disabled }
      >
        <span className="icon" data-status={ PLAYING_STATUS.PLAYING }>
          <i className="fa fa-play" data-status={ PLAYING_STATUS.PLAYING } />
        </span>
      </button>
    ),
    [PLAYING_STATUS.PAUSED]: (
      <button
        data-status={ PLAYING_STATUS.PAUSED }
        className="button is-warning is-large mx-1"
        onClick={ handlePlay }
        disabled={ disabled }
      >
        <span className="icon" data-status={ PLAYING_STATUS.PAUSED }>
          <i className="fa fa-pause" data-status={ PLAYING_STATUS.PAUSED } />
        </span>
      </button>
    )
  };

  return (
    <>
      <nav className="navbar is-fixed-bottom py-4" role="navigation" aria-label="main navigation">
        <div className="container">
          <nav className="level" id="controls">
            <div className="level-left">
              <p className="level-item">
                <button className="button is-white" onClick={ () => focusWindow('window-bpm') }>
                  <span className="icon">
                    <i className="fa fa-drum" />
                  </span>
                  <span>BPM:&nbsp;<span className="text-monospace">{ settings.bpm < 0 ? 'N/A' : settings.bpm }</span></span>
                </button>
              </p>
              <p className="level-item">
                <button className="button is-white" onClick={ () => focusWindow('window-key') }>
                  <span className="icon">
                    <i className="fa fa-hashtag" />
                  </span>
                  <span>Key:&nbsp;{ <span dangerouslySetInnerHTML={ { __html: KEYS[settings.key] } } /> }</span>
                </button>
              </p>
            </div>
            <p className="level-item">
              { status === PLAYING_STATUS.PLAYING ? buttons[PLAYING_STATUS.PAUSED] : buttons[PLAYING_STATUS.PLAYING] }
              { buttons[PLAYING_STATUS.STOPPED] }
            </p>
            <div className="level-right">
              <div className="level-item">
                <button className="button is-primary" onClick={ () => focusWindow('window-channel') }>
                  <span className="icon">
                    <i className="fa fa-code-branch" />
                  </span>
                  <span>Edit Channels</span>
                </button>
              </div>
              <div className="level-item">
                <button className="button is-white timesig-wrap" onClick={ () => focusWindow('window-timesig') }>
                  <span className="icon">
                    <i className="fa fa-stopwatch" />
                  </span>
                  <span className="timesig">
                    Time Signature:&nbsp;
                    <span>
                      <sup>{ settings.timesig[0] <= 0 ? 'N/A' : settings.timesig[0] }</sup>
                      <sub>{ settings.timesig[1] <= 0 ? 'N/A' : settings.timesig[1] }</sub>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </nav>
      <BPMWindow />
      <KeyWindow />
      <TimesigWindow />
      <ChannelWindow />
    </>
  );
};

const mapStateToProps = state => ({
  settings: state.workstation.settings,
  disabled: !Object.keys(state.workstation.tracks).length
});

const mapDispatchToProps = dispatch => ({
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
