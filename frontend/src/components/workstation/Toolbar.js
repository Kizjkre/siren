import { createRef, useState } from 'react';
import * as d3 from 'd3';
import halfmoon from 'halfmoon';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustGlobalSettings, uploadFile } from '../../actions';

const handleUpload = (action, ref) => async e => {
  if (e.target.files.length) {
    const url = URL.createObjectURL(e.target.files[0]);
    const csv = await d3.csv(url);
    action({ name: e.target.files[0].name, csv });
    e.target.value = '';
    ref.current.click();
  }
};

const Toolbar = ({ uploadFile, adjustGlobalSettings }) => {
  const file = createRef();
  const edit = createRef();
  const view = createRef();
  const [state, setState] = useState({ sidebar: true, dark: halfmoon.getPreferredMode() === 'dark-mode' });
  return (
    <nav className="navbar">
      <span className="navbar-brand anchor">Workstation</span>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <span className="nav-link anchor" data-toggle="dropdown" id="nav-dropdown-file" ref={ file }>File</span>
          <div className="dropdown-menu" aria-labelledby="nav-dropdown-file">
            <label htmlFor="upload" className="dropdown-item">
              <input type="file" id="upload" className="d-none" accept="text/csv" onChange={ handleUpload(uploadFile, file) } />
              <i className="fa fa-folder-open"/>
              &emsp;Open
            </label>
            <span className="dropdown-item anchor" onClick={ () => file.current.click() }>
              <i className="fa fa-file-export"/>
              &emsp;Export
            </span>
          </div>
        </li>
        <li className="nav-item dropdown">
          <span className="nav-link anchor" data-toggle="dropdown" id="nav-dropdown-file" ref={ edit }>Edit</span>
          <div className="dropdown-menu" aria-labelledby="nav-dropdown-file">
            <span className="dropdown-item anchor" onClick={ () => edit.current.click() }>
              <i className="fa fa-trash"/>
              &emsp;Remove Track
            </span>
          </div>
        </li>
        <li className="nav-item dropdown">
          <span className="nav-link anchor" data-toggle="dropdown" id="nav-dropdown-file" ref={ view }>View</span>
          <div className="dropdown-menu" aria-labelledby="nav-dropdown-file">
            <span
              className="dropdown-item anchor"
              onClick={ () => {
                view.current.click();
                halfmoon.toggleSidebar();
                setState({ ...state, sidebar: !state.sidebar });
              } }
            >
              <i className={ `fa fa-toggle-${ state.sidebar ? 'off' : 'on' }` } />
              &emsp;{ state.sidebar ? 'Close' : 'Open' } file browser
            </span>
            <span
              className="dropdown-item anchor"
              onClick={ () => {
                view.current.click();
                halfmoon.toggleDarkMode();
                adjustGlobalSettings({ dark: !state.dark });
                setState({ ...state, dark: !state.dark });
              } }
            >
              <i className={ `fa fa-${ state.dark ? 'sun' : 'moon' }` } />
              &emsp;Toggle { state.dark ? 'light' : 'dark' } mode
            </span>
          </div>
        </li>
      </ul>
      <div className="navbar-content ml-auto">
        <Link to="/" className="btn btn-danger">
          <i className="fa fa-sign-out-alt" />
          &emsp;Exit Workstation
        </Link>
      </div>
    </nav>
  );
};

const mapDispatchToProps = dispatch => ({
  uploadFile: file => dispatch(uploadFile(file)),
  adjustGlobalSettings: payload => dispatch(adjustGlobalSettings(payload))
});

export default connect(null, mapDispatchToProps)(Toolbar);
