import { TRACK_CONTROLS_WIDTH, TRACK_WIDTH } from '../../constants/workstation';
import Settings from './track/Settings';
import TrackData from './track/TrackData';
import { connect } from 'react-redux';

const Track = ({ id, column, name, tracks }) => (
  <div className="columns">
    <div className={ `column is-${ TRACK_CONTROLS_WIDTH }` }>
      <div className="box h-100">
        <div className="block">
          <nav className="breadcrumb track-header">
            <ul>
              <li className="is-active">
                <a className="is-size-6 has-text-weight-light"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                  Track { id }
                </a>
              </li>
              <li className="is-active">
                <a className="is-size-5"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                  { name }
                </a>
              </li>
              <li className="is-active">
                <a className="is-size-5"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                  { column }
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="block">
          <div className="tags">
            <h6 className="is-6 pr-2">Channels:</h6>
            {
              tracks[id].settings.channel.length === 0 ? <span className="tag m-0">No connected channels</span>
                : tracks[id].settings.channel.map(channel =>
                  <span key={ channel } className="tag is-primary m-0">{ channel }</span>
                )
            }
          </div>

        </div>
        <Settings column={ column } id={ id } />
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
