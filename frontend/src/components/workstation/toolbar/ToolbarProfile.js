import { focusWindow } from '../../../actions';
import { connect } from 'react-redux';

const ToolbarProfile = ({ selected, setSelected, profiles, focusWindow }) => {
  const handleAdd = () => {
    focusWindow('window-profile');
    setSelected(false);
  };

  const handleOpen = id => () => {
    focusWindow(id);
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
        <hr className="dropdown-divider" />
        {
          Object.keys(profiles).map((profile, i) => (
            <a key={ i } className="navbar-item" onClick={ handleOpen(`window-profile-view-${ profile }`) }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
              <div className="icon-text">
                <span className="icon">
                  <i className="fa fa-chart-line" />
                </span>
                <span>{ profile }</span>
              </div>
            </a>
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profiles: state.workstation.profiles
});

const mapDispatchToProps = dispatch => ({
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarProfile);
