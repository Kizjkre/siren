import { TRACK_CONTROLS_WIDTH, TRACK_WIDTH } from '../../../constants/workstation';
import TrackHeader from './TrackHeader';
import TrackData from './TrackData';

const Track = ({ id, column, name }) => (
  <div className="columns">
    <div className={ `column is-${ TRACK_CONTROLS_WIDTH }` }>
      <div className="box h-100">
        <TrackHeader id={ id } column={ column } name={ name } />
      </div>
    </div>
    <div className={ `column is-${ TRACK_WIDTH }` }>
      <div className="box h-100">
        <TrackData id={ id }/>
      </div>
    </div>
  </div>
);

export default Track;
