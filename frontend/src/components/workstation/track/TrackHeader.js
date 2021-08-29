import * as d3 from 'd3';
import SimpleCodeGenerator from '../../../helper/profile/SimpleCodeGenerator';
import profileParser from '../../../helper/profile/profileParser';
import { connect } from 'react-redux';
import { deleteTrack, editTrack, editTrackData } from '../../../actions';

const TrackHeader = ({ id, column, name, files, tracks, profiles, deleteTrack, editTrack, editTrackData }) => {
  const data = files[tracks[id].file].map(row => row[tracks[id].name]);
  const [min, max] = d3.extent(data);
  const generator = new SimpleCodeGenerator(null, {
    MIN: min,
    MAX: max,
    MEAN: d3.mean(data),
    MEDIAN: d3.median(data),
    MODE: d3.mode(data),
    Q1: d3.quantile(data, 0.25),
    Q3: d3.quantile(data, 0.75)
  });

  const handleDelete = () => deleteTrack(id);
  const handleProfile = e => {
    editTrack(id, { profile: e.target.value });
    generator.tree = profileParser(profiles[e.target.value].map).tree;
    editTrackData(id, data.map(datum => {
      generator.x = datum;
      const result = generator.generate();
      return Math.abs(result) === Infinity ? 0 : result;
    }));
  };

  return (
    <>
      <div className="block">
        <nav className="breadcrumb track-header">
          <ul>
            <li className="is-active">
              <a className="is-size-6 has-text-weight-light"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                Track { id }
              </a>
            </li>
            <li className="is-active">
              <a className="is-size-6 has-text-weight-bold"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                { name }
              </a>
            </li>
            <li className="is-active">
              <a className="is-size-6 has-text-weight-bold"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
                { column }
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="block">
        <div className="columns">
          <div className="column is-3">
            <h6 className="is-6 pr-2">Channels:</h6>
          </div>
          <div className="column is-9">
            <div className="tags">
              {
                tracks[id].settings.channel.length === 0 ? <span className="tag m-0">No connected channels</span>
                  : tracks[id].settings.channel.map(channel =>
                    <span key={ channel } className="tag is-primary">{ channel }</span>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="level">
        <div className="level-item">
          <div className="select">
            <select
              name={ `profile-select-${ id }` }
              defaultValue={ tracks[id].settings.profile }
              onChange={ handleProfile }
            >
              {
                Object.keys(profiles).map(name =>
                  <option key={ name } value={ name }>Profile: { name }</option>
                )
              }
            </select>
          </div>
        </div>
        <div className="level-item">
          <button onClick={ handleDelete } className="button is-danger is-small">
            <span className="icon">
              <i className="fa fa-trash"/>
            </span>
            <span>Delete Track</span>
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  files: state.workstation.files,
  tracks: state.workstation.tracks,
  profiles: state.workstation.profiles
});

const mapDispatchToProps = dispatch => ({
  deleteTrack: id => dispatch(deleteTrack(id)),
  editTrack: (id, settings) => dispatch(editTrack(id, settings)),
  editTrackData: (id, data) => dispatch(editTrackData(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHeader);
