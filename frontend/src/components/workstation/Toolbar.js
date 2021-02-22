import { createRef, useState } from 'react';
import halfmoon from 'halfmoon';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setGlobalDark, uploadFile } from '../../actions';
import store from '../../store/';

const Toolbar = ({ uploadFile, setGlobalDark, dark }) => {
  const file = createRef();
  const edit = createRef();
  const view = createRef();
  const [state, setState] = useState({ sidebar: true });

  const handleUpload = async e => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      await uploadFile(e.target.files[0].name, await (await fetch(url)).text());
      e.target.value = '';
      file.current.click();
    }
  };

  const handleExport = () => {
    const data = `data:text/json;charset=utf-8,${ encodeURIComponent(JSON.stringify(store.getState())) }`;
    const a = document.createElement('a');
    a.setAttribute('href', data);
    a.setAttribute('download', 'omsonification.json');
    a.click();
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand anchor">Workstation</span>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <span className="nav-link anchor" data-toggle="dropdown" id="nav-dropdown-file" ref={ file }>File</span>
          <div className="dropdown-menu" aria-labelledby="nav-dropdown-file">
            <label htmlFor="upload" className="dropdown-item">
              <input type="file" id="upload" className="d-none" accept="text/csv" onChange={ handleUpload } />
              <i className="fa fa-folder-open"/>
              &emsp;Open
            </label>
            <span
              className="dropdown-item anchor"
              onClick={ () => {
                handleExport();
                file.current.click();
              } }
            >
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
              &emsp;Delete Track
            </span>
            <span className="dropdown-item anchor" onClick={ () => edit.current.click() }>
              <i className="fa fa-trash"/>
              &emsp;Remove File
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
                setGlobalDark(!dark);
              } }
            >
              <i className={ `fa fa-${ dark ? 'sun' : 'moon' }` } />
              &emsp;Toggle { dark ? 'light' : 'dark' } mode
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

const mapStateToProps = state => ({
  dark: state.globalSettings.dark
});

const mapDispatchToProps = dispatch => ({
  uploadFile: async (name, raw) => dispatch(await uploadFile(name, raw)),
  setGlobalDark: dark => dispatch(setGlobalDark(dark))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
