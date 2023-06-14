import { For } from 'solid-js';
import { port, removeDataset, removeMapping, removeSynth, state } from '../../state/state';
import { status } from '../util/Window';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';

const Sidebar = () => {
  const handleSynthDragStart = name => e => {
    e.dataTransfer.setData('siren/synth', name);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleMappingDragStart = name => e => {
    e.dataTransfer.setData('siren/mapping', name);
    e.dataTransfer.dropEffect = 'move';
  };


  const handleRegionDragStart = filename => (e, item) => {
    e.dataTransfer.setData('siren/region', JSON.stringify({ filename, attribute: item }));
    e.dataTransfer.dropEffect = 'move';
  };

  // noinspection JSValidateTypes
  return (
    <div
      class="flex flex-col box-border pt-8 basis-1/5 shrink-0 grow pl-12 pr-4 overflow-y-auto scroll"
      classList={ { hidden: !state.sidebar } }
    >
      <SidebarSection name="Data" icon="document-chart-bar">
        <For each={ Object.keys(state.datasets) }>
          {
            filename => (
              <SidebarItem
                icon="document-chart-bar"
                onRemove={ () => removeDataset(filename) }
                dropdown={ state.datasets[filename].columns }
                onDropdownDragStart={ handleRegionDragStart(filename) }
                dragType="data"
                accept="siren/region"
              >
                { filename }
              </SidebarItem>
            )
          }
        </For>
      </SidebarSection>
      <SidebarSection name="Synths" icon="wave-sine">
        <For each={ Object.keys(state.synths) }>
          {
            name => (
              <SidebarItem
                icon="wave-sine"
                onRemove={ () => removeSynth(name) }
                onClick={ () => port.synths[name].postMessage({ action: 'demo' }) }
                draggable="true"
                onDragStart={ handleSynthDragStart(name) }
              >
                { name }
              </SidebarItem>
            )
          }
        </For>
      </SidebarSection>
      <SidebarSection name="Mappings" icon="math-x-plus-y">
        <For each={ Object.keys(state.mappings) }>
          {
            name => (
              <SidebarItem
                icon="math-x-plus-y"
                onRemove={ () => removeMapping(name) }
                onClick={ () => status[name].setClosed(!status[name].closed()) }
                draggable="true"
                onDragStart={ handleMappingDragStart(name) }
              >
                { name }
              </SidebarItem>
            )
          }
        </For>
      </SidebarSection>
    </div>
  );
};

export default Sidebar;
