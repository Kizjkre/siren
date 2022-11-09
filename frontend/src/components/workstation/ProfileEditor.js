// noinspection ExceptionCaughtLocallyJS

import { Grammar, Parser } from 'nearley';
import { Fragment, useEffect, useRef, useState } from 'react';
import syntax from '../../util/grammars/syntax/syntax';
import { TOKEN_TYPES } from '../../util/lexer';

// REF: https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
const ProfileEditor = ({ onChange, setClear, initialCode, editable }) => {
  const [code, setCode] = useState('');
  const [display, setDisplay] = useState([]);
  const [error, setError] = useState('');

  const editing = useRef();
  const highlighting = useRef();

  useEffect(() => {
    if (initialCode) handleChange({ target: { value: initialCode } });
    setClear?.(() => () => {
      setCode('');
      setDisplay([]);
      setError('');
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = e => {
    setCode(e.target.value);
    handleScroll();

    let valid = true;

    try {
      if (error) setError('');

      if (!e.target.value.length) {
        setDisplay([]);
      } else {
        const parser = new Parser(Grammar.fromCompiled(syntax));
        parser.feed(e.target.value);
        if (!parser.results.length) {
          const line = parser.lexer.line;
          const buf = parser.lexer.buffer.split('\n');
          const index = parser.lexer.index - buf.slice(0, line - 1).join(' ').length - 1;
          throw new SyntaxError(`unexpected "${ e.target.value[index - 1] }" at line ${ line } col ${ index }:\n ${ line }\t${ buf[line - 1] }\n  \t${ new Array(index).fill().join(' ') }^`);
        }
        setDisplay(parser.results[0].map((token, i) => {
          // noinspection FallThroughInSwitchStatementJS
          switch (token.type) { // eslint-disable-line default-case
            case TOKEN_TYPES.FUNCTION:
              return <span className="profile-editor-code-function" key={ i }>{ token.text }</span>;
            case TOKEN_TYPES.KEYWORD:
              return <span className="profile-editor-code-keyword" key={ i }>{ token.text }</span>;
            case TOKEN_TYPES.ADDITIVE:
              if (!token.binary) {
                return <span className="profile-editor-code-number" key={ i }>{ token.text }</span>;
              }
            case TOKEN_TYPES.MULTIPLICATIVE: // eslint-disable-line no-fallthrough
            case TOKEN_TYPES.EXPONENTIAL:
              return <span className="profile-editor-code-operation" key={ i }>{ token.text }</span>;
            case TOKEN_TYPES.NUMBER:
              return <span className="profile-editor-code-number" key={ i }>{ token.text }</span>;
            case TOKEN_TYPES.PARENTHETICAL:
              return <span className="profile-editor-code-parenthesis" key={ i }>{ token.text }</span>;
            case TOKEN_TYPES.WHITESPACE:
              return <span key={ i }>{ token.text }</span>;
          }
          return null;
        }));
      }
    } catch (err) {
      setError(`${ err.name }: ${ err.message }`);
      setDisplay(e.target.value);
      valid = false;
    }

    onChange?.({ expression: e.target.value, valid });
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
      <div className={ `notification is-danger ${ error ? '' : 'is-hidden' }` }>
        <pre className="profile-editor-error">{ error }</pre>
      </div>
    </>
  );
};

export default ProfileEditor;
