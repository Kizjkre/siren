import Window from '../../Window';

const ProfileWindow = () => {
  return (
    <Window title="Edit Profiles" id="window-edit-profile">
      <article className="panel is-primary">
        <p className="panel-heading">
          Primary
        </p>
        <p className="panel-tabs"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <a onClick={  }>+ Add Profile</a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
        </p>
      </article>
    </Window>
  );
};

export default ProfileWindow;
