import { createSignal } from 'solid-js';
import { useState } from '../../context/Context';
import Tooltip from '../util/Tooltip';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';

const Sidebar = () => {
  const [state] = useState();
  const [tooltip, setTooltip] = createSignal(false);
  const [location, setLocation] = createSignal({ x: 0, y: 0 });

  const handleClick = e => {
    setTooltip(!tooltip());
    setLocation({ x: e.clientX, y: e.clientY });
  };

  return [
    <div class={ `flex flex-col box-border pt-8 basis-1/5 shrink-0 grow pl-12 pr-4 ${ state().sidebar ? '' : 'hidden' }` }>
      <SidebarSection name="Data" icon="document-chart-bar">
        <SidebarItem icon="document-chart-bar" onClick={ handleClick }>coral_data.csv</SidebarItem>
      </SidebarSection>
      <SidebarSection name="Synths" icon="wave-sine">
      </SidebarSection>
      <SidebarSection name="Profiles" icon="math-x-plus-y">
      </SidebarSection>
    </div>,
    <>{ tooltip() && <Tooltip location={ location() }><p>hi</p></Tooltip>}</>
  ];
};

export default Sidebar;
