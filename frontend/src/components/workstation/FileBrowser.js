import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { focusWindow } from '../../actions';

const FileBrowser = ({ files, focusWindow }) => {
  const [state, setState] = useState({ content: null });

  const handleFocus = name => () => focusWindow(name);

  useEffect(() => {
    if (files.length) {
      setState({
        ...state,
        content: (
          files.map(file => (
            <a href="#!" key={ `anchor-${ file.name }` } data-toggle="modal" data-target={ `modal-${ file.name }` } onClick={ handleFocus(`#modal-${ file.name }`) } className="sidebar-link sidebar-link-with-icon">
              <span className="sidebar-icon">
                <i className="fa fa-file-csv" />
              </span>
              { file.name }
            </a>
          ))
        )
      })
    }
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h5 className="sidebar-title">
          <i className="fa fa-folder"/>
          &emsp;Files
        </h5>
        <hr className="sidebar-divider"/>
        { state.content }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  focusWindow: payload => dispatch(focusWindow(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);