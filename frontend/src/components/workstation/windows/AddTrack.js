import { useState } from 'react';
import { connect } from 'react-redux';
import { addTrack } from '../../../actions';
import Window from './Window';

const AddTrack = ({ anchor, track, files, addTrack }) => {
  const [state, setState] = useState({ column: '' });

  let name, columns;
  for (const file of files) {
    if (file.name === track) {
      name = file.name;
      columns = file.data.columns;
      break;
    }
  }

  const handleSelect = e => setState({ ...state, column: e.target.value });
  const handleSubmit = () => {
    if (state.column !== '') {
      addTrack(state.column, name, files.find(file => file.name === track).data.map(row => isNaN(row[state.column]) ? row[state.column] : parseFloat(row[state.column])));
      setState({ ...state, column: '' });
    }
  };

  return (
    <Window anchor={ anchor } buttons={ [{ close: true, color: state.column === '' ? '' : 'green', onClick: handleSubmit, disabled: state.column === '' }] } title="Add Track">
      <select className="form-control form-control-lg" value={ state.column } onChange={ handleSelect }>
        <option value="" disabled>Select a column</option>
        { columns.map(column => <option key={ `column-${ column }` } value={ column }>{ column }</option>) }
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
