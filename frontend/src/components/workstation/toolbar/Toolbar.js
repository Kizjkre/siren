import { useRef, useState } from 'react';
import Navbar from '../../Navbar';
import ToolbarFile from './ToolbarFile';
import ToolbarEdit from './ToolbarEdit';
import ToolbarView from './ToolbarView';
import useClickOutside from '../../../hooks/useClickOutside';
import { Link } from 'react-router-dom';
import ToolbarSynth from './ToolbarSynth';
import ToolbarProfile from './ToolbarProfile';

const Toolbar = () => {
  const navbar = useRef();
  const [selected, setSelected] = useState({ file: false, edit: false, view: false, synth: false, profile: false });

  useClickOutside(e => {
    if (!navbar.current?.contains(e.target)) {
      setSelected({ file: false, edit: false, view: false, synth: false, profile: false });
    }
  });

  return (
    <Navbar>
      <div className="navbar-start" ref={ navbar }>
        <ToolbarFile
          selected={ selected.file }
          setSelected={ file => setSelected({ file, edit: false, view: false, synth: false, profile: false }) }
        />
        <ToolbarEdit
          selected={ selected.edit }
          setSelected={ edit => setSelected({ file: false, edit, view: false, synth: false, profile: false }) }
        />
        <ToolbarView
          selected={ selected.view }
          setSelected={ view => setSelected({ file: false, edit: false, view, synth: false, profile: false }) }
        />
        <ToolbarSynth
          selected={ selected.synth }
          setSelected={ synth => setSelected({ file: false, edit: false, view: false, synth, profile: false }) }
        />
        <ToolbarProfile
          selected={ selected.profile }
          setSelected={ profile => setSelected({ file: false, edit: false, view: false, synth: false, profile }) }
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
