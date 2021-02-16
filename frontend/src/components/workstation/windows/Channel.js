import { useState, createRef, useEffect } from 'react';
import Window from './Window';
import { connect } from 'react-redux';
import { FEATURES } from '../../../constants/workstation';
import { setGlobalSettings } from '../../../actions';

const deselect = e => Array.from(e.children).forEach(child => {
  if (child.classList.contains('active')) {
    child.classList.remove('active');
  }
});

const Channel = ({ anchor, title, i, tracks, channels, setGlobalSettings }) => {
  const [state, setState] = useState({ selected: -1 });

  const ul = createRef();
  const channel = state.selected < 0 ? { features: [] } : channels.find(c => c.id === state.selected);

  useEffect(() => {
    if (state.selected === -1) {
      deselect(ul.current);
    }
  }, [state.selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (tracks[i].settings.channel.length <= state.selected) {
      setState({ ...state, selected: -1 });
    }
  }, [tracks[i].settings.channel]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChannel = channel => e => {
    deselect(e.target.parentElement.parentElement);
    e.target.parentElement.classList.add('active');
    setState({ ...state, selected: channel });
  };

  const handleFeature = e => {
    const c = [...channels];
    const index = channels.findIndex(ch => ch.id === state.selected);
    if (!e.target.classList.contains('btn-primary')) {
      e.target.classList.add('btn-primary');
      c[index].features.find(f => f.name === e.target.innerText.trim()).controller = i;
    } else {
      e.target.classList.remove('btn-primary');
      c[index].features.find(f => f.name === e.target.innerText.trim()).controller = -1;
    }
    setGlobalSettings({ channels: c });
  };

  const handleClose = () => setState({ ...state, channel: -1 });

  return (
    <Window anchor={ anchor } title={ `${ title }: Channel Settings` } onClose={ handleClose }>
      <nav>
        <ul className="pagination text-center" ref={ ul }>
          <li className="page-item">
            <button className="page-link">
              <i className="fa fa-angle-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>
          </li>
          { tracks[i].settings.channel.map(i => <li key={ `pagination-${ i }` } className="page-item"><button className="page-link" onClick={ handleChannel(i) }>{ i }</button></li>) }
          <li className="page-item">
            <button className="page-link">
              <i className="fa fa-angle-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className={ state.selected === -1 ? 'transparent' : '' }>
        <h5 className="font-weight-bold">Channel { state.selected } Controlled Features</h5>
        {
          FEATURES.map(f => {
            const feature = channel.features.find(f2 => f2.name === f);
            if ([-1, i].includes(feature?.controller)) {
              return <button key={ f } className="btn ml-5" onClick={ handleFeature }>{ f }</button>;
            }
            return null;
          })
        }
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks,
  channels: state.globalSettings.channels
});

const mapDispatchToProps = dispatch => ({
  setGlobalSettings: settings => dispatch(setGlobalSettings(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
