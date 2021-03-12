import { createRef, useState } from 'react';
import halfmoon from 'halfmoon';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setGlobalDark, setState, uploadFile } from '../../actions';
import store from '../../store/';

const Toolbar = ({ uploadFile, setGlobalDark, dark, setGlobalState }) => {
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

  const handleImport = async e => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      setGlobalState(await (await fetch(url)).json());
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
      <span className="navbar-brand anchor">SIREN</span>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <span className="nav-link anchor" data-toggle="dropdown" id="nav-dropdown-file" ref={ file }>File</span>
          <div className="dropdown-menu anchor" aria-labelledby="nav-dropdown-file">
            <label htmlFor="upload" className="dropdown-item anchor margin-0">
              <input type="file" id="upload" className="d-none" accept="text/csv" onChange={ handleUpload } />
              <i className="fa fa-folder-open" />
              &emsp;Open
            </label>
            <label htmlFor="import" className="dropdown-item anchor margin-0">
              <input type="file" id="import" className="d-none" accept="application/json" onChange={ handleImport } />
              <i className="fa fa-file-import" />
              &emsp;Import
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
        <a href="https://github.com/Kizjkre/siren/issues/new" target="_blank" className="btn btn-danger mr-10">
          <i className="fa fa-bug" />
          &emsp;Report Bug
        </a>
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
  setGlobalDark: dark => dispatch(setGlobalDark(dark)),
  setGlobalState: state => dispatch(setState(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
