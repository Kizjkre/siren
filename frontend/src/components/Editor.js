import p5 from 'p5';
import s from './editor/sketch';
import { createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Editor = () => {
  const editor = createRef();

  useEffect(() => {
    const bound = editor.current.getBoundingClientRect();
    new p5(s(bound.height, bound.width), 'editor');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="page-wrapper with-navbar">
        <nav className="navbar">
        <span className="navbar-brand anchor">
          SIREN
        </span>
          <ul className="navbar-nav d-none d-md-flex">
            <li className="nav-item">
              <Link to="/workstation" className="nav-link">Workstation</Link>
            </li>
          </ul>
        </nav>
        <div id="editor" className="content-wrapper" ref={ editor } />
      </div>
    </>
  );
};

export default Editor;
