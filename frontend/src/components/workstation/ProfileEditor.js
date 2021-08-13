import { Fragment, useState } from 'react';
import profileParser from '../../helper/profile/profileParser';

const ProfileEditor = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleType = e => {
    setCode(e.target.value);
    try {
      const { tokens } = profileParser(e.target.value);
      if (error) {
        setError('');
      }
    } catch (e) {
      setError(`${ e.name }: ${ e.message }`);
    }
  };

  return (
    <div className="profile-editor">
      <div className="columns">
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
          <textarea onChange={ handleType } value={ code } rows={ code.split('\n').length + 1 } wrap="off" />
        </div>
      </div>
      <div className={ `columns ${ error ? '' : 'is-hidden' }` }>
        <div className="column">
          <div className="notification is-danger">{ error }</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
