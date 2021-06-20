import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { focusWindow } from '../../actions';

const FileBrowser = ({ files, focusWindow }) => {
  const [datasets, setDatasets] = useState();
  const [synths, setSynths] = useState();

  useEffect(() => {
    setDatasets(files.length ? files.map(file => (
        <li key={ file.name } onClick={ () => focusWindow(`window-${ file.name }`) }>
          <a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
            <span className="icon-text">
              <span className="icon">
                <i className="fa fa-file-csv" />
              </span>
              <span>{ file.name }</span>
            </span>
          </a>
        </li>
      )) : (
        <li>
          <a className="is-active"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
            <span className="icon-text">
              <span className="icon">
                <i className="fa fa-folder-open" />
              </span>
              <span>No datasets</span>
            </span>
          </a>
        </li>
    ));
    setSynths(
      <li>
        <a className="is-active"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <span className="icon-text">
            <span className="icon">
              <i className="fa fa-folder-open" />
            </span>
            <span>No synths</span>
          </span>
        </a>
      </li>
    );
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <aside className="menu">
      <p className="menu-label">
        <span className="icon-text">
          <span className="icon">
            <i className="fa fa-table" />
          </span>
          <span>Datasets</span>
        </span>
      </p>
      <ul className="menu-list">
        { datasets }
      </ul>
      <p className="menu-label">
        <span className="icon-text">
          <span className="icon">
            <i className="fa fa-file-audio" />
          </span>
          <span>Synths</span>
        </span>
      </p>
      <ul className="menu-list">
        { synths }
      </ul>
    </aside>
  );
};

const mapStateToProps = state => ({
  files: state.workstation.files
});

const mapDispatchToProps = dispatch => ({
  focusWindow: window => dispatch(focusWindow(window))
});

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);
