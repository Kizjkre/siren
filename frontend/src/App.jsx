import { For, onMount } from 'solid-js';
import Controls from './components/controls/Controls';
import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Toolbar from './components/toolbar/Toolbar';
import MappingSandbox from './components/util/sandbox/MappingSandbox';
import SynthSandbox from './components/util/sandbox/SynthSandbox';
import Window from './components/util/Window';
import useDefaultMapping from './hooks/useDefaultMapping';
import useDefaultSynth from './hooks/useDefaultSynth';
import useSampleData from './hooks/useSampleData';
import useTimeline from './hooks/useTimeline';
import { state, updateMapping } from './state/state';
import ace from './util/ace/ace';

const App = () => {
  useSampleData();
  useDefaultSynth();
  useDefaultMapping();
  useTimeline();

  const mappingWindows = {};

  onMount(() => Object.entries(mappingWindows).forEach(([name, ref]) => {
    const editor = ace(ref);
    editor.setValue(state.mappings[name].code, 1);
    editor.container.addEventListener('keyup', () => updateMapping(name, editor.getValue()));
  }));

  // noinspection JSValidateTypes
  return [
    <div class="flex flex-col h-screen w-screen">
      <Toolbar />
      <div class="flex flex-wrap md:flex-nowrap min-h-0 grow">
        <Sidebar />
        <Main />
      </div>
      <Controls />
    </div>,
    <For each={ Object.keys(state.synths) }>
      {
        name => (
          <SynthSandbox name={ name } uuid={ state.synths[name].uuid }>
            { state.synths[name].code }
          </SynthSandbox>
        )
      }
    </For>,
    <For each={ Object.keys(state.mappings) }>
      {
        name => (
          <Window ref={ mappingWindows[name] } title={ name } />
        )
      }
    </For>
  ];
};

export default App;
