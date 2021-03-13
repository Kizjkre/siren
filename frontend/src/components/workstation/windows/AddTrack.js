import { useState } from 'react';
import { connect } from 'react-redux';
import { addTrack } from '../../../actions';
import Window from './Window';

const AddTrack = ({ anchor, track, files, addTrack }) => {
  const [state, setState] = useState({ column: '' });

  const file = files.find(file => file.name === track);

  const handleSelect = e => setState({ ...state, column: e.target.value });
  const handleSubmit = () => {
    if (state.column !== '') {
      addTrack(state.column, file.name, file.data.map(row => row[state.column]));
      setState({ ...state, column: '' });
    }
  };

  return (
    <Window anchor={ anchor } buttons={ [{ close: true, color: state.column === '' ? '' : 'green', onClick: handleSubmit, disabled: state.column === '' }] } title="Add Track">
      <select className="form-control form-control-lg" value={ state.column } onChange={ handleSelect }>
        <option value="" disabled>Select a column</option>
        { Object.keys(file.data[0]).map(column => <option key={ `column-${ column }` } value={ column }>{ column }</option>) }
      </select>
    </Window>
  );
};

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  addTrack: (name, file, data) => dispatch(addTrack(name, file, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);
