import { focusWindow, setFileBrowser } from '../../../actions';
import { connect } from 'react-redux';

const ToolbarView = ({ selected, setSelected, fileBrowser, setFileBrowser, focusWindow }) => {
  const handleFileBrowser = () => {
    setFileBrowser(!fileBrowser);
    setSelected(false);
  };

  const handleView = () => {
    focusWindow('window-view');
    setSelected(false);
  };

  return (
    <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` }>
      <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>View</span>
      <div className="navbar-dropdown">
        <a className="navbar-item"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-moon"/>
            </span>
            <span>Toggle Mode</span>
          </div>
        </a>
        <a className="navbar-item" onClick={ handleFileBrowser }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <div className="icon-text">
            <span className="icon">
              <i className={ `fa fa-toggle-${ fileBrowser ? 'on' : 'off' }` }/>
            </span>
            <span>Toggle Sidebar</span>
          </div>
        </a>
        <a className="navbar-item" onClick={ handleView }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-file-csv" />
            </span>
            <span>View CSV File</span>
          </div>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fileBrowser: state.workstation.settings.fileBrowser
});

const mapDispatchToProps = dispatch => ({
  setFileBrowser: fileBrowser => dispatch(setFileBrowser(fileBrowser)),
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarView);
