import { useState, createRef, useEffect } from 'react';
import Window from '../../Window';
import { connect } from 'react-redux';
import { setGlobalChannels } from '../../../actions';

const deselect = e => Array.from(e.children).forEach(child => {
  if (child.classList.contains('active')) {
    child.classList.remove('active');
  }
});

const Channel = ({ anchor, title, i, tracks, channels, setGlobalChannels }) => {
  const [state, setState] = useState({ selected: -1 });

  const ul = createRef();

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
    const c = JSON.parse(JSON.stringify(channels));
    const index = channels.findIndex(ch => ch.id === state.selected);
    if (!e.target.classList.contains('btn-primary')) {
      e.target.classList.add('btn-primary');
      c[index].features.find(f => f.name === e.target.innerText.trim()).controller = i;
    } else {
      e.target.classList.remove('btn-primary');
      c[index].features.find(f => f.name === e.target.innerText.trim()).controller = -1;
    }
    setGlobalChannels(c);
  };

  const handleClose = () => setState({ ...state, selected: -1 });

  return (
    <Window anchor={ anchor } title={ `${ title }: Channel Settings` } onClose={ handleClose }>
      <nav>
        <ul className="pagination text-center" ref={ ul }>
          { tracks[i].settings.channel.map(i => <li key={ `pagination-${ i }` } className="page-item"><button className="page-link" onClick={ handleChannel(i) }>{ i }</button></li>) }
        </ul>
      </nav>
      <div className={ state.selected === -1 ? 'transparent' : '' }>
        <h5 className="font-weight-bold">Channel { state.selected } Controlled Features</h5>
        {
          channels.find(c => c.id === state.selected)?.features.map(feature => {
            return feature.controller === -1 ?
              <button key={ feature.name } className="btn ml-5" onClick={ handleFeature }>{ feature.name }</button> :
              feature.controller === i ?
                <button key={ feature.name } className="btn ml-5 btn-primary" onClick={ handleFeature }>{ feature.name }</button> :
                <button key={ feature.name } className="btn ml-5 disabled" disabled>{ feature.name }</button>
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
  setGlobalChannels: channels => dispatch(setGlobalChannels(channels))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
