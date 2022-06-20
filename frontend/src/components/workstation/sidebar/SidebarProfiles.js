import SidebarSectionTemplate from './SidebarSectionTemplate';
import { connect } from 'react-redux';
import { focusWindow } from '../../../actions';

const SidebarProfiles = ({ profiles, focusWindow }) => {
  const handleClick = name => () => focusWindow(`window-profile-view-${ name }`);

  return (
    <SidebarSectionTemplate title="Profiles" icon="fa fa-chart-line" empty={ !Object.keys(profiles).length }>
      {
        Object.keys(profiles).map(profile => (
          <li key={ profile }>
            <a onClick={ handleClick(profile) }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-chart-line" />
                </span>
                <span>{ profile }</span>
              </span>
            </a>
          </li>
        ))
      }
      <li>
        <a className="button is-info" onClick={ () => focusWindow('window-profile') }> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <span className="icon-text">
            <span className="icon">
              <i className="fa fa-plus" />
            </span>
            <span>Add profile</span>
          </span>
        </a>
      </li>
    </SidebarSectionTemplate>
  );
};

const mapStateToProps = state => ({
  profiles: state.workstation.profiles
});

const mapDispatchToProps = dispatch => ({
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarProfiles);
