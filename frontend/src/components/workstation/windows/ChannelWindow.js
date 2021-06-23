import { useState } from 'react';
import Window from '../../Window';
import { connect } from 'react-redux';
import { createChannel, editChannel, focusWindow } from '../../../actions';

const ChannelWindow = ({ tracks, channels, createChannel, editChannel, focusWindow }) => {
  const [open, setOpen] = useState('');
  const [name, setName] = useState('');
  const [track, setTrack] = useState('');

  const tabs = [];
  const body = {};

  Object.keys(channels).forEach(name => {
    tabs.push((
      <li key={ name } onClick={ () => setOpen(name) } className={ open === name ? 'is-active' : '' }>
        <a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          { name }
        </a>
      </li>
    ));
    body[name] = (
      <div key={ name }>
        <div className="tags">
          {
            channels[name].tracks.map(id =>
              <span key={ id } className="tag is-primary">
                { tracks[id].name }
                <button className="delete" onClick={ () => editChannel(name, id) } />
              </span>
            )
          }
        </div>
        <div className="block">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select value={ track } onChange={ e => setTrack(e.target.value) }>
                  <option value="" disabled>Select a track</option>
                  {
                    Object.entries(tracks)
                      .filter(track => !channels[name].tracks.includes(parseInt(track[0])))
                      .map(track =>
                        <option key={ track[0] } value={ track[0] }>
                          { track[1].name }
                        </option>
                      )
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-success is-fullwidth"
                onClick={ () => {
                  editChannel(name, parseInt(track));
                  setTrack('');
                } }
                disabled={ track === '' || channels[name].tracks.includes(track) }
              >
                <span className="icon">
                  <i className="fa fa-plus" />
                </span>
                <span>Add Track</span>
              </button>
            </div>
          </div>
        </div>
        <button
          className="button is-primary is-fullwidth"
          onClick={ () => focusWindow(`window-channel-settings-${ name }`) }
        >
          <span className="icon">
            <i className="fa fa-cog" />
          </span>
          <span>Channel Settings</span>
        </button>
      </div>
    );
  });

  return (
    <Window id="window-channel" title="Channels">
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Channel Name"
            value={ name }
            onChange={ e => setName(e.target.value) }
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button
            className="button is-primary is-fullwidth"
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
      {
        Object.keys(channels).length <= 0 ? null : (
          <>
            <hr />
            <div className="container">
              <div className="tabs">
                <ul>
                  { tabs }
                </ul>
              </div>
              { body[open] }
            </div>
          </>
        )
      }
    </Window>
  );
};

const mapDispatchToProps = dispatch => ({
  createChannel: name => dispatch(createChannel(name)),
  editChannel: (name, trackId) => dispatch(editChannel(name, trackId)),
  focusWindow: id => dispatch(focusWindow(id))
});

const mapStateToProps = state => ({
  tracks: state.workstation.tracks,
  channels: state.workstation.channels
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelWindow);
