import { extent, mean, median, mode, quantile } from 'd3';
import { useState } from 'react';
import { connect } from 'react-redux';
import { deleteTrack, editTrack, editTrackData } from '../../../actions';
import calculate from '../../../helper/grammars/calculator';
import { lex, TOKEN_TYPES } from '../../../helper/lexer';

const TrackHeader = ({ id, column, name, files, tracks, profiles, deleteTrack, editTrack, editTrackData }) => {
  const [data] = useState(files[tracks[id].file].map(row => row[tracks[id].name]));
  const [[MIN, MAX]] = useState(extent(data));
  const [kw] = useState({
    MIN, MAX,
    MEAN: mean(data),
    MEDIAN: median(data),
    MODE: mode(data),
    Q1: quantile(data, 0.25),
    Q3: quantile(data, 0.75)
  });

  const handleDelete = () => deleteTrack(id);
  const handleProfile = e => {
    editTrack(id, { profile: e.target.value });
    editTrackData(id, data.map((d, i) => {
      const expression = lex(profiles[e.target.value]).reduce((acc, t) => acc + (t.type === TOKEN_TYPES.KEYWORD ? (t.value === 'x' ? d : (t.value === 'i' ? i : kw[t.value])) : t.toString()), '');
      const result = calculate(expression);
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
                  : tracks[id].settings.channel.map((channel, i) =>
                    <span key={ i } className="tag is-primary">{ channel }</span>
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
