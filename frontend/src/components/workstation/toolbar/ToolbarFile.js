import JSZip from 'jszip';
import { setState, uploadFile } from '../../../actions';
import { connect } from 'react-redux';
import store from '../../../store';

const ToolbarFile = ({ selected, setSelected, uploadFile, setState }) => {
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
      const zip = await JSZip.loadAsync(await (await fetch(URL.createObjectURL(e.target.files[0]))).blob()); // TODO: Error handling
      setState(JSON.parse(await zip.files['siren-session/state.json'].async('string')));
      e.target.value = '';
      setSelected(false);
    }
  };

  const handleExport = async () => {
    const zip = new JSZip();
    zip.folder('siren-session')
      .file('state.json', JSON.stringify(store.getState()))
      .folder('impulse-responses');
    const data = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
    const a = document.createElement('a');
    a.setAttribute('href', URL.createObjectURL(data));
    a.setAttribute('download', 'session.siren.zip');
    a.click();
    setSelected(false);
  };

  return (
    <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` }>
      <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>File</span>
      <div className="navbar-dropdown">
        <label htmlFor="open" className="navbar-item">
          <input type="file" id="open" className="is-hidden" accept="text/csv" onChange={ handleOpen } />
          <div className="icon-text">
            <div className="icon">
              <i className="fa fa-folder-open"/>
            </div>
            <span>Open</span>
          </div>
        </label>
        <label htmlFor="import" className="navbar-item">
          <input type="file" id="import" className="is-hidden" accept="application/zip" onChange={ handleImport } />
          <div className="icon-text">
            <div className="icon">
              <i className="fa fa-file-import"/>
            </div>
            <span>Import</span>
          </div>
        </label>
        <a className="navbar-item" onClick={ handleExport }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
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
  setState: state => dispatch(setState(state))
});

export default connect(null, mapDispatchToProps)(ToolbarFile);
