import { useState } from 'react';
import { connect } from 'react-redux';
import { focusWindow } from '../../actions';
import { PLAYING_STATUS } from '../../constants/workstation';
import play from '../../util/synth/play';

const Controls = ({ disabled, focusWindow }) => {
  const [status, setStatus] = useState(PLAYING_STATUS.STOPPED);

  const handlePlay = e => {
    switch (e.target.getAttribute('data-status')) {
      case PLAYING_STATUS.STOPPED + '':
        // stop();
        setStatus(PLAYING_STATUS.STOPPED);
        break;
      case PLAYING_STATUS.PLAYING + '':
        play();
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
      <nav className="navbar is-fixed-bottom py-4 control-background" role="navigation" aria-label="main navigation">
        <div className="container">
          <nav className="level" id="controls">
            <div className="level-item">
              { status === PLAYING_STATUS.PLAYING ? buttons[PLAYING_STATUS.PAUSED] : buttons[PLAYING_STATUS.PLAYING] }
              { buttons[PLAYING_STATUS.STOPPED] }
            </div>
            <div className="level-right">
              <div className="level-item">
                <button className="button is-primary" onClick={ () => focusWindow('window-channel') }>
                  <span className="icon">
                    <i className="fa fa-code-branch" />
                  </span>
                  <span>Edit Channels</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = state => ({
  disabled: !Object.keys(state.workstation.tracks).length
});

const mapDispatchToProps = dispatch => ({
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
