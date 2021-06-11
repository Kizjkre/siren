import { setState, uploadFile } from '../../../actions';
import { connect } from 'react-redux';
import store from '../../../store';
import { forwardRef } from 'react';

const ToolbarFile = ({ selected, setSelected, fowardRef, uploadFile, setGlobalState }, ref) => {
  const handleOpen = async e => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      await uploadFile(e.target.files[0].name, await (await fetch(url)).text());
      e.target.value = '';
      setSelected(false);
    }
  };

  const handleImport = async e => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      setGlobalState(await (await fetch(url)).json());
      e.target.value = '';
      setSelected(false);
    }
  };

  const handleExport = () => {
    const data = `data:text/json;charset=utf-8,${ encodeURIComponent(JSON.stringify(store.getState())) }`;
    const a = document.createElement('a');
    a.setAttribute('href', data);
    a.setAttribute('download', 'siren-session.json');
    a.click();
    setSelected(false);
  };

  return (
    <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` } ref={ ref }>
      <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>File</span>
      <div className="navbar-dropdown">
        <a href="#!" className="navbar-item">
          <label htmlFor="open" className="navbar-label">
            <input type="file" id="open" className="is-hidden" accept="text/csv" onChange={ handleOpen } />
            <div className="icon-text">
              <div className="icon">
                <i className="fa fa-folder-open"/>
              </div>
              <span>Open</span>
            </div>
          </label>
        </a>
        <a href="#!" className="navbar-item">
          <label htmlFor="import" className="navbar-label">
            <input type="file" id="import" className="is-hidden" accept="application/json" onChange={ handleImport } />
            <div className="icon-text">
              <div className="icon">
                <i className="fa fa-file-import"/>
              </div>
              <span>Import</span>
            </div>
          </label>
        </a>
        <a href="#!" className="navbar-item" onClick={ handleExport }>
          <div className="icon-text">
            <div className="icon">
              <i className="fa fa-file-export"/>
            </div>
            <span>Export</span>
          </div>
        </a>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  uploadFile: async (name, raw) => dispatch(await uploadFile(name, raw)),
  setGlobalState: state => dispatch(setState(state))
});

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(forwardRef(ToolbarFile));
