import { Fragment, useState, useRef, useEffect } from 'react';
import profileParser from '../../helper/profile/profileParser';
import { SLAToken } from '../../helper/profile/SimpleLexicalAnalyzer';

const ProfileEditor = ({ save, onChange, onExpression, initialCode, editable }) => {
  if (!onChange) {
    onChange = () => null;
  }
  if (!onExpression) {
    onExpression = () => null;
  }

  const [code, setCode] = useState('');
  const [display, setDisplay] = useState([]);
  const [error, setError] = useState('');
  const [clear, setClear] = useState(false);

  const editing = useRef();
  const highlighting = useRef();

  useEffect(() => {
    if (initialCode) {
      handleChange({ target: { value: initialCode } });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (save !== clear) {
      setCode('');
      setDisplay([]);
      setError('');
      setClear(save);
    }
  }, [save]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = e => {
    setCode(e.target.value);
    onChange(e.target.value);
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
            innerHTML.push(<span className="profile-editor-code-number" key={ i }>{ token.value }</span>);
            break;
          case SLAToken.TYPES.additive:
          case SLAToken.TYPES.multiplicative:
          case SLAToken.TYPES.exponential:
            innerHTML.push(<span className="profile-editor-code-operation" key={ i }>{ token.value }</span>);
            break;
          case SLAToken.TYPES.keyword:
            innerHTML.push(<span className="profile-editor-code-keyword" key={ i }>{ token.value }</span>);
            break;
          case SLAToken.TYPES.parenthesis:
            innerHTML.push(<span className="profile-editor-code-parenthesis" key={ i }>{ token.value }</span>);
            break;
          default:
            innerHTML.push(<Fragment key={ i }>{ token.value }</Fragment>);
        }
      });

      setDisplay(innerHTML);

      onExpression(e.target.value);
    } catch (err) {
      setError(`${ err.name }: ${ err.message }`);
      setDisplay(e.target.value);
    }
  };

  const handleScroll = () => {
    highlighting.current.scrollTop = editing.current?.scrollTop;
    highlighting.current.scrollLeft = editing.current?.scrollLeft;
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
          {
            editable ? (
              <textarea
                onChange={ handleChange }
                onScroll={ handleScroll }
                value={ code }
                rows={ code.split('\n').length }
                wrap="off"
                ref={ editing }
                spellCheck="false"
              />
            ) : null
          }
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
