import SidebarDatasets from './SidebarDatasets';
import SidebarSynths from './SidebarSynth';
import SidebarProfiles from './SidebarProfiles';

const Sidebar = () => (
  <aside className="menu">
    <SidebarDatasets />
    <SidebarSynths />
    <SidebarProfiles />
  </aside>
);

export default Sidebar;
