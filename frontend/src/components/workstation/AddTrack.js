import { useState } from 'react';
import { connect } from 'react-redux';
import { selectColumn } from '../../actions';
import Window from './Window';

const AddTrack = ({ anchor, track, files, selectColumn }) => {
  const [state, setState] = useState({ column: '' });

  let columns;
  for (const file of files) {
    if (file.name === track) {
      columns = file.csv.columns;
      break;
    }
  }

  const handleSelect = e => setState({ ...state, column: e.target.value });
  const handleSubmit = e => {
    if (state.column !== '') {
      e.target.setAttribute('href', '#!');
      selectColumn(state.column);
      setState({ ...state, column: '' })
    }
  };

  return (
    <Window anchor={ anchor } buttons={ [{ href: `#${ anchor }`, color: state.column === '' ? '' : 'green', onClick: handleSubmit }] } title="Add Track">
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
  selectColumn: column => dispatch(selectColumn(column))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);