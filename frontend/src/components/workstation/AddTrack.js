import { createRef, useState } from 'react';
import { connect } from 'react-redux';
import { selectColumn } from '../../actions';

const handleDrag = ref => () => {
  // TODO: Make window draggable
};

const AddTrack = ({ anchor, track, files, selectColumn }) => {
  const window = createRef();
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
    <div className="modal window" id={ anchor } tabIndex="-1" role="dialog" data-overlay-dismissal-disabled="true" data-esc-dismissal-disabled="true">
      <div className="modal-dialog" role="document" ref={ window }>
        <div className="modal-content" onClick={ handleDrag(window) }>
          <h5 className="modal-title">
            <a href="#!" className="btn btn-square rounded-circle custom-modal-dismiss red">&#160;</a>
            &nbsp;&nbsp;
            <a href={ `#${ anchor }` } aria-disabled={ state.column === '' } className={ `btn btn-square rounded-circle custom-modal-dismiss ${ state.column === '' ? '' : 'green' }` } onClick={ handleSubmit }>&#160;</a>
            <br />Add Track
          </h5>
          <p>
            <select className="form-control form-control-lg" value={ state.column } onChange={ handleSelect }>
              <option value="" disabled>Select a column</option>
              { columns.map(column => <option key={ `column-${ column }` } value={ column }>{ column }</option>) }
            </select>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  selectColumn: column => dispatch(selectColumn(column))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);