import { useState } from 'react';
import { connect } from 'react-redux';
import { createChannel } from '../../../actions';
import Window from '../../Window';
import ChannelSettings from '../channel/ChannelSettings';

const ChannelWindow = ({ channels, createChannel }) => {
  const [open, setOpen] = useState(Object.keys(channels)[0]);
  const [name, setName] = useState('');

  return (
    <Window id="window-channel" title="Channels">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Channel Name"
            value={ name }
            onChange={ e => setName(e.target.value) }
          />
        </div>
        <div className="control">
          <button
            className="button is-success is-fullwidth"
            onClick={ () => {
              createChannel(name);
              setName('');
            } }
            disabled={ name === '' || Object.keys(channels).includes(name) }
          >
            <span className="icon">
              <i className="fa fa-plus" />
            </span>
            <span>Create Channel</span>
          </button>
        </div>
      </div>
      <div className="tabs">
        <ul>
          {
            Object.keys(channels).map((channel, i) => (
              <li key={ i } className={ channel === open ? 'is-active' : '' }>
                <a onClick={ () => setOpen(channel) }>{ channel }</a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
              </li>
            ))
          }
        </ul>
      </div>
      {
        Object.keys(channels).length <= 0 ? null : (
          Object.keys(channels).map((channel, i) => (
            <div key={ i } className={ channel === open ? '' : 'is-hidden' }>
              <ChannelSettings name={ channel } />
            </div>
          ))
        )
      }
    </Window>
  );
};

const mapDispatchToProps = dispatch => ({
  createChannel: name => dispatch(createChannel(name))
});

const mapStateToProps = state => ({
  channels: state.workstation.channels
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelWindow);
