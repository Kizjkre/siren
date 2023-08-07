import ToolbarEdit from './ToolbarEdit';
import ToolbarFile from './ToolbarFile';
import ToolbarMapping from './ToolbarMapping';
import ToolbarSynth from './ToolbarSynth';
import ToolbarTrack from './ToolbarTrack';
import ToolbarView from './ToolbarView';

const Toolbar = () => {
  return (
    <nav class="flex">
      <h1 class="flex items-center p-4">
        <img class="h-6" src="/favicon.svg" alt="SIREN" />
      </h1>
      <ToolbarFile />
      <ToolbarEdit />
      <ToolbarView />
      <ToolbarTrack />
      <ToolbarSynth />
      <ToolbarMapping />
    </nav>
  );
};

export default Toolbar;
