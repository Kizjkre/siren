import { useRef, useState } from 'react';
import Navbar from '../Navbar';
import ToolbarFile from './toolbar/ToolbarFile';
import ToolbarEdit from './toolbar/ToolbarEdit';
import ToolbarView from './toolbar/ToolbarView';
import useClickOutside from './toolbar/useClickOutside';

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
        <ToolbarFile selected={ selected.file } setSelected={ file => setSelected({ file, edit: false, view: false }) } />
        <ToolbarEdit selected={ selected.edit } setSelected={ edit => setSelected({ file: false, edit, view: false }) } />
        <ToolbarView selected={ selected.view } setSelected={ view => setSelected({ file: false, edit: false, view }) } />
      </div>
    </Navbar>
  );
};

export default Toolbar;
