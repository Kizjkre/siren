import { useState } from 'react';
import Window from './Window';
import { connect } from 'react-redux';

const Channel = ({ anchor, title, i, settings }) => {
  const [state, setState] = useState({ channel: -1 });

  const handleChannel = i => e => {
    Array.from(e.target.parentElement.parentElement.children).forEach(child => {
      if (child.classList.contains('active')) {
        child.classList.remove('active');
      }
    });
    e.target.parentElement.classList.add('active');
    setState({ ...state, channel: i });
  };

  const handleAdd = () => {};

  return (
    <Window anchor={ anchor } title={ `${ title }: Channel Settings` }>
      <nav>
        <ul className="pagination text-center">
          <li className="page-item">
            <button className="page-link">
              <i className="fa fa-angle-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>
          </li>
          { settings[i].channel.map(i => <li key={ `pagination-${ i }` } className="page-item"><button className="page-link" onClick={ handleChannel(i) }>{ i }</button></li>) }
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
  settings: state.settings
});

export default connect(mapStateToProps)(Channel);
