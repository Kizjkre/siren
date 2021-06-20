import { useRef, useState } from 'react';
import Navbar from '../Navbar';
import ToolbarFile from './toolbar/ToolbarFile';
import ToolbarEdit from './toolbar/ToolbarEdit';
import ToolbarView from './toolbar/ToolbarView';
import useClickOutside from '../../hooks/useClickOutside';
import { Link } from 'react-router-dom';

const Toolbar = () => {
  const navbar = useRef();
  const [selected, setSelected] = useState({ file: false, edit: false, view: false });

  useClickOutside(e => {
    if (!navbar.current.contains(e.target)) {
      setSelected({ file: false, edit: false, view: false });
    }
  });

  return (
    <Navbar>
      <div className="navbar-start" ref={ navbar }>
        <ToolbarFile
          selected={ selected.file }
          setSelected={ file => setSelected({ file, edit: false, view: false }) }
        />
        <ToolbarEdit
          selected={ selected.edit }
          setSelected={ edit => setSelected({ file: false, edit, view: false }) }
        />
        <ToolbarView
          selected={ selected.view }
          setSelected={ view => setSelected({ file: false, edit: false, view }) }
        />
      </div>
      <div className="navbar-end">
        <div className="navbar-item is-unhoverable">
          <a
            href="https://github.com/Kizjkre/siren/issues/new"
            target="_blank"
            rel="noreferrer"
            className="button is-danger"
          >
            <span className="icon">
              <i className="fa fa-bug" />
            </span>
            <span>Report Bug</span>
          </a>
        </div>
        <div className="navbar-item is-unhoverable">
          <Link to="/" className="button is-danger">
            <span className="icon">
              <i className="fa fa-sign-out-alt" />
            </span>
            <span>Exit Workstation</span>
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default Toolbar;
