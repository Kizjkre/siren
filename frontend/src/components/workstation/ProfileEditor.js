import { Fragment, useState, useRef } from 'react';
import profileParser from '../../helper/profile/profileParser';
import { SLAToken } from '../../helper/profile/SimpleLexicalAnalyzer';

const ProfileEditor = () => {
  const [code, setCode] = useState('');
  const [display, setDisplay] = useState();
  const [error, setError] = useState('');

  const editing = useRef();
  const highlighting = useRef();

  const handleChange = e => {
    setCode(e.target.value);

    handleScroll();

    try {
      const { tokens } = profileParser(e.target.value);

      if (error) {
        setError('');
      }

      let innerHTML = [];

      tokens.forEach((token, i) => {
        switch (token.type) {
          case SLAToken.TYPES.number:
            innerHTML.push(<span style={ { color: 'goldenrod' } } key={ i }>{ token.value }</span>);
            break;
          case SLAToken.TYPES.additive:
          case SLAToken.TYPES.multiplicative:
          case SLAToken.TYPES.exponential:
            innerHTML.push(<span style={ { color: 'mediumpurple' } } key={ i }>{ token.value }</span>);
            break;
          case SLAToken.TYPES.keyword:
            innerHTML.push(<span style={ { color: 'darkseagreen' } } key={ i }>{ token.value }</span>);
            break;
          default:
            innerHTML.push(<Fragment key={ i }>{ token.value }</Fragment>);
        }
      });

      setDisplay(innerHTML);
    } catch (err) {
      setError(`${ err.name }: ${ err.message }`);
      setDisplay(e.target.value);
    }
  };

  const handleScroll = () => {
    highlighting.current.scrollTop = editing.current.scrollTop;
    highlighting.current.scrollLeft = editing.current.scrollLeft;
  };

  return (
    <>
      <div className="profile-editor columns box">
        <div className="column is-1">
          <p className="profile-editor-line-number">
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
        <div className="column is-11 profile-editor-ta-wrap">
          <textarea
            onChange={ handleChange }
            onScroll={ handleScroll }
            value={ code }
            rows={ code.split('\n').length }
            wrap="off"
            ref={ editing }
            spellCheck="false"
          />
          <pre ref={ highlighting }>
            <code aria-hidden>{ display }</code>
          </pre>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className={ `notification is-danger ${ error ? '' : 'is-hidden' }` }>{ error }</div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditor;
