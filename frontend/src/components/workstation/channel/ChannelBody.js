import { connect } from 'react-redux';
import { editChannel, focusWindow } from '../../../actions';
import { useState } from 'react';

const ChannelBody = ({ name, tracks, channels, editChannel }) => {
  const [track, setTrack] = useState('');

  return (
    <div key={ name }>
      <div className="tags">
        {
          channels[name].tracks.map(id =>
            <span key={ id } className="tag is-primary">
              { tracks[id].name }
              <button className="delete" onClick={ () => editChannel(name, id) }/>
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
                  <i className="fa fa-plus"/>
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
            <i className="fa fa-cog"/>
          </span>
        <span>Channel Settings</span>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  tracks: state.workstation.tracks,
  channels: state.workstation.channels
});

const mapDispatchToProps = dispatch => ({
  editChannel: (name, trackId) => dispatch(editChannel(name, trackId)),
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelBody);
