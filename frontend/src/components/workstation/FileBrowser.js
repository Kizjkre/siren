import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTrack } from '../../actions';

const FileBrowser = ({ files, addTrack }) => {
  const [state, setState] = useState({ content: null });

  useEffect(() => {
    if (files.length) {
      addTrack(files[0].name);
      setState({
        ...state,
        content: (
          files.map(file => {
            return (
              <a href={ `#modal-${ file.name }` } key={ `anchor-${ file.name }` } className="sidebar-link sidebar-link-with-icon">
                <span className="sidebar-icon">
                  <i className="fa fa-file-csv" />
                </span>
                { file.name }
              </a>
            )
          })
        )
      })
    }
  }, [files]);

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
  addTrack: file => dispatch(addTrack(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);