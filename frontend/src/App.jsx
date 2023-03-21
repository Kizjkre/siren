import { For, onMount } from 'solid-js';
import Controls from './components/controls/Controls';
import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Toolbar from './components/toolbar/Toolbar';
import Sandbox from './components/util/sandbox/Sandbox';
import SynthSandbox from './components/util/sandbox/SynthSandbox';
import Window from './components/util/Window';
import { useState } from './context/Context';
import useDefaultMapping from './hooks/useDefaultMapping';
import useDefaultSynth from './hooks/useDefaultSynth';
import useSampleData from './hooks/useSampleData';
import useTimeline from './hooks/useTimeline';
import create from './util/monaco/create';

const App = () => {
  useSampleData();
  useDefaultSynth();
  useDefaultMapping();
  useTimeline();

  const [state] = useState();

  const mappingWindows = {};

  onMount(() => Object.entries(mappingWindows).forEach(([name, ref]) => create(ref, state.mappings[name])));

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
          <Sandbox name={ name } uuid={ state.synths[name].uuid }>
            { state.synths[name].code }
          </Sandbox>
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
