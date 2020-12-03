import { connect } from 'react-redux';

const FileBrowser = ({ files }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h5 className="sidebar-title">
          <i className="fa fa-folder"/>
          &emsp;Files
        </h5>
        <hr className="sidebar-divider"/>
        {
          !files.length ? null : files.map(file =>
            <a href="#!" key={ file.name } className="sidebar-link sidebar-link-with-icon">
              <span className="sidebar-icon">
                <i className="fa fa-file-csv" />
              </span>
              { file.name }
            </a>
          )
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.files
});

export default connect(mapStateToProps)(FileBrowser);