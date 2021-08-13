import { Fragment, useState } from 'react';
import profileParser from '../../helper/profile/profileParser';
import { SLAToken } from '../../helper/profile/SimpleLexicalAnalyzer';

const ProfileEditor = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleType = e => {
    setCode(e.target.innerText);

    try {
      const { tokens } = profileParser(e.target.innerText);

      if (error) {
        setError('');
      }

      let innerHTML = '';

      tokens.forEach(token => {
        switch (token.type) {
          case SLAToken.TYPES.number:
            innerHTML += `<span style="color: goldenrod;">${ token.value }</span>`;
            break;
          case SLAToken.TYPES.additive:
          case SLAToken.TYPES.multiplicative:
          case SLAToken.TYPES.exponential:
            innerHTML += `<span style="color: purple;">${ token.value }</span>`;
            break;
          case SLAToken.TYPES.keyword:
            innerHTML += `<span style="color: darkseagreen;">${ token.value }</span>`;
            break;
          default:
            innerHTML += token.value;
        }
      });

      e.target.innerHTML = `${ innerHTML }<span> </span>`;

      // REF: https://stackoverflow.com/a/54189595
      console.log(e.target.selectionStart);
      let selection = document.getSelection();
      let range = document.createRange();

      range.setStart(e.target, e.target.innerText.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      setError(`${ e.name }: ${ e.message }`);
    }
  };

  return (
    <>
      <div className="profile-editor">
        <div className="columns">
          <div className="column is-1">
            <p>
              {
                code.split(/\n/).map((_, i) => (
                  <Fragment key={ i }>
                    { i + 1 }
                    <br />
                  </Fragment>
                ))
              }
            </p>
          </div>
          <div className="column is-11">
            <div contentEditable onInput={ handleType } className="profile-editor-editor" />
          </div>
        </div>
      </div>
      <div className={ `notification is-danger ${ error ? '' : 'is-hidden' }` }>{ error }</div>
    </>
  );
};

export default ProfileEditor;
