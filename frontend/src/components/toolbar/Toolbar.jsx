import ToolbarEdit from './ToolbarEdit';
import ToolbarFile from './ToolbarFile';
import ToolbarSynth from './ToolbarSynth';
import ToolbarTrack from './ToolbarTrack';
import ToolbarView from './ToolbarView';

const Toolbar = () => {
  return (
    <nav class="flex">
      <h1 class="p-4">SIREN</h1>
      <ToolbarFile />
      <ToolbarEdit />
      <ToolbarView />
      <ToolbarTrack />
      <ToolbarSynth />
    </nav>
  );
};

export default Toolbar;
