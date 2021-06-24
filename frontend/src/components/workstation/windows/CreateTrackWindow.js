import { useState } from 'react';
import { connect } from 'react-redux';
import { createTrack } from '../../../actions';
import Window from '../../Window';

const CreateTrackWindow = ({ track, files, createTrack, id }) => {
  const [column, setColumn] = useState('');

  const handleSelect = e => setColumn(e.target.value);

  const handleSubmit = () => {
    if (column !== '') {
      createTrack(column, track, files[track].map(row => row[column]));
      setColumn('');
    }
  };

  return (
    <Window
      id={ id }
      buttons={ [
        {
          close: true,
          color: column === '' ? '' : 'is-success',
          onClick: handleSubmit,
          disabled: column === '',
          text: 'Add Track'
        }
      ] }
      title={ `Add Track: ${ track }` }
    >
      <div className="select is-fullwidth">
        <select value={ column } onChange={ handleSelect }>
          <option value="" disabled>Select a column</option>
          {
            Object.keys(files[track][0])
              .map(column => <option key={ `column-${ column }` } value={ column }>{ column }</option>)
          }
        </select>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  files: state.workstation.files
});

const mapDispatchToProps = dispatch => ({
  createTrack: (name, file, data) => dispatch(createTrack(name, file, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrackWindow);
