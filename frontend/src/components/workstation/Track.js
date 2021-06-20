import { TRACK_CONTROLS_WIDTH, TRACK_WIDTH } from '../../constants/workstation';
import Settings from './Settings';
import TrackData from './TrackData';
import { connect } from 'react-redux';

const Track = ({ i, id, column, name, tracks }) => (
  <div className="columns">
    <div className={ `column is-${ TRACK_CONTROLS_WIDTH }` }>
      <div className="box h-100">
        <div className="block">
          <h2 className="subtitle">Track { i + 1 }: { column }</h2>
          <p className="has-text-weight-light">{ name }</p>
          {
            tracks.find(t => t.id === id).settings.channel.length > 0 ?
              <p className="has-text-weight-light">
                Connected to channel { tracks.find(t => t.id === id).settings.channel }
              </p> : <></>
          }
        </div>
        <Settings column={ column } i={ i } id={ id } />
      </div>
    </div>
    <div className={ `column is-${ TRACK_WIDTH }` }>
      <div className="box h-100">
        <TrackData id={ id } />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  tracks: state.workstation.tracks
});

export default connect(mapStateToProps)(Track);
