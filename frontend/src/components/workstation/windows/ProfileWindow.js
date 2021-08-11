import Window from '../../Window';
import ProfileEditor from '../ProfileEditor';

const ProfileWindow = () => {
  return (
    <Window
      title="Add Profile"
      id="window-profile"
      buttons={ [{
        close: true,
        color: 'is-success',
        text: 'Add Profile'
      }] }
    >
      <div className="box">
        <h5 className="subtitle is-5">Mapping Function</h5>
        <ProfileEditor />
      </div>
    </Window>
  );
};

export default ProfileWindow;
