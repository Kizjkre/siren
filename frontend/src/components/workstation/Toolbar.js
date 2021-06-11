import { useRef, useState } from 'react';
import Navbar from '../Navbar';
import ToolbarFile from './toolbar/ToolbarFile';
import ToolbarEdit from './toolbar/ToolbarEdit';
import ToolbarView from './toolbar/ToolbarView';
import useClickOutside from './toolbar/useClickOutside';

const Toolbar = () => {
  const file = useRef();
  const edit = useRef();
  const view = useRef();
  const [selected, setSelected] = useState({ file: false, edit: false, view: false });

  useClickOutside(e => {
    if (!file.current.contains(e.target) && !edit.current.contains(e.target) && !view.current.contains(e.target)) {
      setSelected({ file: false, edit: false, view: false });
    }
  });

  return (
    <Navbar>
      <ToolbarFile selected={ selected.file } setSelected={ file => setSelected({ file, edit: false, view: false }) } ref={ file } />
      <ToolbarEdit selected={ selected.edit } setSelected={ edit => setSelected({ file: false, edit, view: false }) } ref={ edit } />
      <ToolbarView selected={ selected.view } setSelected={ view => setSelected({ file: false, edit: false, view }) } ref={ view } />
    </Navbar>
  );
};

export default Toolbar;
