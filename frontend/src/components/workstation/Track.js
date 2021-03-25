import { TRACK_CONTROLS_WIDTH, TRACK_WIDTH } from '../../constants/workstation';
import Settings from './Settings';
import TrackData from './TrackData';
import { connect } from 'react-redux';

const Track = ({ i, id, column, name, tracks }) => (
  <div className="row row-eq-spacing">
    <div className={ `col-${ TRACK_CONTROLS_WIDTH }` }>
      <div className="card track">
        <h2 className="card-title">Track { i + 1 } - { column }</h2>
        <p className="text-muted">{ name }</p>
        { /* TODO: Fix this */ }
        {
          tracks.find(t => t.id === id).settings.channel.length > 0 ?
            <p className="text-muted">Connected to channel { tracks.find(t => t.id === id).settings.channel }</p> : <></>
        }
        <Settings column={ column } i={ i } />
      </div>
    </div>
    <div className={ `col-${ TRACK_WIDTH }` }>
      <div className="card track overflow-scroll d-flex align-content-center">
        <TrackData id={ id } />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  tracks: state.tracks
});

export default connect(mapStateToProps)(Track);
