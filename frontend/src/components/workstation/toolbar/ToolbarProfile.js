import { focusWindow } from '../../../actions';
import { connect } from 'react-redux';

const ToolbarProfile = ({ selected, setSelected, focusWindow }) => {
  const handleAdd = () => {
    focusWindow('window-profile');
    setSelected(false);
  };

  return (
    <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` }>
      <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>Profile</span>
      <div className="navbar-dropdown">
        <a className="navbar-item" onClick={ handleAdd }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-plus" />
            </span>
            <span>Add Profile</span>
          </div>
        </a>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(null, mapDispatchToProps)(ToolbarProfile);
