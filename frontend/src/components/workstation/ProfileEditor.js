import { Fragment, useState } from 'react';
import profileParser from '../../helper/profileParser';

const ProfileEditor = () => {
  const [code, setCode] = useState('');

  const handleLine = e => {
    setCode(e.target.value);
    console.log(profileParser(e.target.value));
  };

  return (
    <div className="profile-editor columns">
      <div className="column is-1">
        <p>
          {
            code.split('\n').map((_, i) => (
              <Fragment key={ i }>
                { i + 1 }
                <br />
              </Fragment>
            ))
          }
        </p>
      </div>
      <div className="column is-11">
        <textarea onChange={ handleLine } value={ code } rows={ code.split('\n').length + 1 } wrap="off" />
      </div>
    </div>
  );
};

export default ProfileEditor;
