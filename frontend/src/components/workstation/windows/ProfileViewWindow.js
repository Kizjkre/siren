import Window from '../../Window';
import { connect } from 'react-redux';
import ProfileEditor from '../ProfileEditor';

const ProfileViewWindow = ({ id, name, profiles }) => (
  <Window title={ `View Profile: ${ name }` } id={ id }>
    <ProfileEditor initialCode={ profiles[name].map } save={ false } />
  </Window>
);

const mapStateToProps = state => ({
  profiles: state.workstation.profiles
});

export default connect(mapStateToProps)(ProfileViewWindow);
