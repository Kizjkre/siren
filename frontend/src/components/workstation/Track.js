import { TRACK_CONTROLS_WIDTH, TRACK_WIDTH } from '../../constants/workstation';
import Settings from './Settings';
import TrackData from './TrackData';

const Track = ({ i, column, name }) => (
  <div className="row row-eq-spacing">
    <div className={ `col-${ TRACK_CONTROLS_WIDTH }` }>
      <div className="card track">
        <h2 className="card-title">Track { i + 1 } - { column }</h2>
        <p className="text-muted">{ name }</p>
        <Settings column={ column } i={ i } />
      </div>
    </div>
    <div className={ `col-${ TRACK_WIDTH }` }>
      <div className="card track overflow-scroll d-flex align-content-center">
        <TrackData column={ column } />
      </div>
    </div>
  </div>
);

export default Track;
