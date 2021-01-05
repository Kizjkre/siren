import { useState, createRef, useEffect } from 'react';
import Window from './Window';
import { connect } from 'react-redux';

const deselect = e => Array.from(e.children).forEach(child => {
  if (child.classList.contains('active')) {
    child.classList.remove('active');
  }
});

const Channel = ({ anchor, title, i, tracks }) => {
  const [state, setState] = useState({ channel: -1 });

  const ul = createRef();

  useEffect(() => {
    if (state.channel === -1) {
      deselect(ul.current);
    }
  }, [state.channel]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChannel = i => e => {
    deselect(e.target.parentElement.parentElement);
    e.target.parentElement.classList.add('active');
    setState({ ...state, channel: i });
  };

  const handleAdd = () => {};

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
      <div className={ state.channel === -1 ? 'transparent' : '' }>
        <h5 className="font-weight-bold">Channel { state.channel } Controlled Features</h5>
        <button className="btn btn-primary" onClick={ handleAdd }>+&emsp;Add Controlled Feature</button>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks
});

export default connect(mapStateToProps)(Channel);
