import { Link } from 'react-router-dom';
import { setFileBrowser } from '../../../actions';
import { connect } from 'react-redux';

const ToolbarView = ({ selected, setSelected, fileBrowser, setFileBrowser }) => {
  const handleFileBrowser = () => {
    setFileBrowser(!fileBrowser);
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
            <span>Toggle File Browser</span>
          </div>
        </a>
        <Link className="navbar-item" to="/editor">
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-code"/>
            </span>
            <span>Code Editor</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fileBrowser: state.workstation.settings.fileBrowser
});

const mapDispatchToProps = dispatch => ({
  setFileBrowser: fileBrowser => dispatch(setFileBrowser(fileBrowser))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarView);
