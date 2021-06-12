import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const FileBrowser = ({ files }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    setContent(files.map(file => (
      <li key={ file.name }>
        <a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <span className="icon-text">
            <span className="icon">
              <i className="fa fa-file-csv" />
            </span>
            <span>{ file.name }</span>
          </span>
        </a>
      </li>
    )))
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <aside className="menu">
      <p className="menu-label">
        <span className="icon-text">
          <span className="icon">
            <i className="fa fa-folder" />
          </span>
          <span>Files</span>
        </span>
      </p>
      <ul className="menu-list">
        { content }
      </ul>
    </aside>
  );
};

const mapStateToProps = state => ({
  files: state.files
});

export default connect(mapStateToProps)(FileBrowser);
